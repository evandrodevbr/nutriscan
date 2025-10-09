import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    let ip: string | null = null;

    // 1. Tentar obter IP dos headers (produção com proxy/CDN)
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    if (forwarded) {
      ip = forwarded.split(",")[0].trim();
    } else if (realIp) {
      ip = realIp;
    }

    // 2. Se não conseguiu IP dos headers (localhost), usar serviço externo
    if (
      !ip ||
      ip === "::1" ||
      ip === "127.0.0.1" ||
      ip.startsWith("192.168.") ||
      ip.startsWith("10.")
    ) {
      console.log(
        "IP local detectado, obtendo IP público via api.ipify.org..."
      );

      try {
        const ipifyResponse = await fetch("https://api.ipify.org?format=json", {
          headers: {
            "User-Agent": "NutriScan/1.0 (https://nutriscan.com.br)",
          },
        });

        if (ipifyResponse.ok) {
          const ipifyData = await ipifyResponse.json();
          ip = ipifyData.ip;
          console.log(`IP público obtido: ${ip}`);
        }
      } catch (ipifyError) {
        console.warn("Erro ao obter IP via ipify:", ipifyError);
      }
    }

    // 3. Se ainda não tem IP, usar fallback
    if (!ip) {
      console.warn("Não foi possível detectar IP, usando fallback");
      return NextResponse.json({
        country: "Brazil",
        countryCode: "br",
      });
    }

    console.log(`Detectando localização para IP: ${ip}`);

    // 4. Consultar API de geolocalização ip-api.com
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode`,
      {
        headers: {
          "User-Agent": "NutriScan/1.0 (https://nutriscan.com.br)",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`IP API returned ${response.status}`);
    }

    const data = await response.json();

    // 5. Verificar se a API retornou sucesso
    if (data.status === "fail") {
      console.warn("IP API failed, using fallback");
      return NextResponse.json({
        country: "Brazil",
        countryCode: "br",
      });
    }

    console.log(`País detectado: ${data.country} (${data.countryCode})`);

    return NextResponse.json({
      country: data.country,
      countryCode: data.countryCode.toLowerCase(),
    });
  } catch (error) {
    console.error("Erro ao detectar localização:", error);

    // Fallback para Brasil em caso de erro
    return NextResponse.json({
      country: "Brazil",
      countryCode: "br",
    });
  }
}
