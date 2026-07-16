"use client";

import Link from "next/link";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Product } from "@/lib/openFoodFactsApi";
import { AlertTriangle } from "lucide-react";
import { formatNutritionData } from "@/lib/openFoodFactsApi";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: number;
  currentPage?: number;
  variant?: "default" | "mobile";
}

const NUTRI_GRADE_CLASS: Record<string, string> = {
  a: "a", b: "b", c: "c", d: "d", e: "e",
};

function getVerdict(grade?: string, nova?: number): { label: string; colorClass: string } {
  if (grade === "a" || grade === "b") return { label: "Recomendado",    colorClass: "text-[var(--nutri-a)]" };
  if (grade === "c" || nova === 3)    return { label: "Com moderação",  colorClass: "text-[var(--nutri-c)]" };
  return                                     { label: "Evitar",         colorClass: "text-[var(--nutri-e)]" };
}

function getVerdictDotBg(grade?: string, nova?: number): string {
  if (grade === "a" || grade === "b") return "bg-[var(--nutri-a)]";
  if (grade === "c" || nova === 3)    return "bg-[var(--nutri-c)]";
  return "bg-[var(--nutri-e)]";
}

function getImageUrl(product: Product): string {
  return (
    product.image_front_url ||
    product.image_front_small_url ||
    product.image_url ||
    product.image_small_url ||
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f3efe7' width='400' height='400'/%3E%3Ctext fill='%23a39c93' font-family='Georgia,serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3ESem imagem%3C/text%3E%3C/svg%3E"
  );
}

/* ── Nutri-Letter hero circle ───────────────────────────────────────────── */
function NutriLetter({ grade, size = 56 }: { grade: string; size?: number }) {
  const g = grade?.toLowerCase();
  if (!g || !NUTRI_GRADE_CLASS[g]) return null;
  return (
    <div
      className={`nutri-letter ${g}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.62), flexShrink: 0 }}
      aria-label={`Nutri-Score ${g.toUpperCase()}`}
    >
      {g.toUpperCase()}
    </div>
  );
}

/* ── Verdict dot — pure Tailwind, no inline style ──────────────────────── */
function VerdictDot({ grade, nova }: { grade?: string; nova?: number }) {
  const { label, colorClass } = getVerdict(grade, nova);
  const dotBg = getVerdictDotBg(grade, nova);
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-semibold", colorClass)}>
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotBg)} />
      {label}
    </span>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MOBILE VARIANT — horizontal row
   All hover/focus states are pure CSS via Tailwind so keyboard + touch work
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MobileCard({ product, className, priority, currentPage }: Omit<ProductCardProps, "variant">) {
  const imageUrl = getImageUrl(product);
  const grade = product.nutrition_grades?.toLowerCase();
  const nova = product.nova_group;
  const allergenCount =
    product.allergens_tags?.filter((a) =>
      ["gluten", "milk", "eggs", "nuts", "peanuts", "soy"].some((c) =>
        a.toLowerCase().includes(c)
      )
    ).length ?? 0;

  return (
    <Link
      href={`/produto/${product.code}`}
      className={cn(
        "product-card group flex gap-3.5 items-center p-3.5",
        "bg-[var(--ink-0)] border border-[var(--ink-200)] rounded-[14px]",
        /* Hover — CSS only, works for keyboard focus-visible too */
        "transition-all duration-200 ease-out",
        "hover:border-[var(--ink-400)] hover:-translate-y-px hover:shadow-[0_6px_20px_-10px_rgba(0,0,0,0.14)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink-0)]",
        "active:scale-[0.99] active:shadow-none",
        className
      )}
      aria-label={`${product.product_name || "Produto"} — ver detalhes`}
    >
      {/* Thumb */}
      <div className="relative shrink-0 w-[72px] h-[72px] rounded-[10px] overflow-hidden bg-[var(--ink-100)]">
        <OptimizedImage
          src={imageUrl}
          alt={product.product_name || "Produto"}
          fill
          priority={priority}
          onPageChange={currentPage}
          className="object-contain p-1.5"
          sizes="72px"
          placeholder="empty"
        />
      </div>

      {/* Center text */}
      <div className="flex-1 min-w-0">
        <div className="eyebrow-mono truncate mb-0.5">
          {product.brands || "Marca desconhecida"}
        </div>
        <div className="text-[15px] font-medium text-[var(--ink-900)] truncate mb-2 tracking-[-0.005em]">
          {product.product_name || "Produto sem nome"}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <VerdictDot grade={grade} nova={nova} />
          {nova && (
            <>
              <span className="text-[var(--ink-300)]">·</span>
              <span className="eyebrow-mono text-[var(--ink-500)]">NOVA {nova}</span>
            </>
          )}
          {allergenCount > 0 && (
            <>
              <span className="text-[var(--ink-300)]">·</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[var(--warn)] font-medium">
                <AlertTriangle className="w-2.5 h-2.5" strokeWidth={2} />
                {allergenCount} alérgeno{allergenCount > 1 ? "s" : ""}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Nutri-Score letter */}
      {grade && NUTRI_GRADE_CLASS[grade] && <NutriLetter grade={grade} size={52} />}
    </Link>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DEFAULT VARIANT — portrait card, image hero
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function DefaultCard({ product, className, priority, currentPage }: Omit<ProductCardProps, "variant">) {
  const imageUrl = getImageUrl(product);
  const nutritionData = formatNutritionData(product);
  const grade = product.nutrition_grades?.toLowerCase();
  const nova = product.nova_group;
  const allergenCount =
    product.allergens_tags?.filter((a) =>
      ["gluten", "milk", "eggs", "nuts", "peanuts", "soy"].some((c) =>
        a.toLowerCase().includes(c)
      )
    ).length ?? 0;

  return (
    <Link
      href={`/produto/${product.code}`}
      className={cn(
        /* Layout */
        "product-card group flex flex-col h-full",
        /* Surface */
        "bg-[var(--ink-0)] border border-[var(--ink-200)] rounded-2xl overflow-hidden",
        /* Transitions — one rule governs border + lift + shadow */
        "transition-all duration-200 ease-out",
        /* Hover — CSS, no JS */
        "hover:border-[var(--ink-400)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-14px_rgba(0,0,0,0.15)]",
        /* Keyboard focus ring — WCAG 2.4.7 compliant */
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]",
        /* Press feedback */
        "active:scale-[0.99] active:shadow-none",
        className
      )}
      aria-label={`${product.product_name || "Produto"} — ver detalhes`}
    >
      {/* ── Hero image area ─────────────────────────────────────────────── */}
      <div className="relative aspect-[5/4] bg-[var(--ink-50)] border-b border-[var(--ink-200)] overflow-hidden">
        {/* Image zooms on hover because parent now HAS the `group` class */}
        <OptimizedImage
          src={imageUrl}
          alt={product.product_name || "Produto"}
          fill
          priority={priority}
          onPageChange={currentPage}
          className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Nutri-Score — top-right */}
        {grade && NUTRI_GRADE_CLASS[grade] && (
          <div className="absolute top-3.5 right-3.5 drop-shadow-md">
            <NutriLetter grade={grade} size={52} />
          </div>
        )}

        {/* Allergen chip — top-left */}
        {allergenCount > 0 && (
          <div className="absolute top-3.5 left-3.5">
            <span className="rd-chip warn" style={{ padding: "4px 9px", fontSize: 11 }}>
              <AlertTriangle className="w-3 h-3" strokeWidth={2} />
              {allergenCount}
            </span>
          </div>
        )}
      </div>

      {/* ── Card body ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3.5 p-[18px] flex-1">

        {/* Brand + product name */}
        <div>
          <div className="eyebrow-mono truncate mb-1">
            {product.brands || "Marca desconhecida"}
          </div>
          <h3
            className="font-display text-[22px] leading-[1.15] tracking-[-0.01em] text-[var(--ink-900)] line-clamp-2 m-0"
          >
            {product.product_name || "Nome não disponível"}
          </h3>
        </div>

        {/* ── Nutrition mini-bar: 4 columns ─────────────────────────────── */}
        {nutritionData && (
          <div className="grid grid-cols-4 border-y border-[var(--ink-200)]">
            {[
              { l: "kcal",   v: nutritionData.energy },
              { l: "Açúcar", v: nutritionData.sugars },
              { l: "Gord.",  v: nutritionData.fat },
              { l: "Sódio",  v: nutritionData.sodium },
            ].map((n, i) =>
              n.v ? (
                <div
                  key={n.l}
                  className={cn(
                    "flex flex-col items-center justify-center py-3 px-1.5 min-w-0 text-center",
                    i < 3 && "border-r border-[var(--ink-200)]"
                  )}
                >
                  <span className="font-display text-base text-[var(--ink-900)] leading-none truncate max-w-full">
                    {n.v}
                  </span>
                  <span className="eyebrow-mono text-[9px] text-[var(--ink-500)] mt-1.5">
                    {n.l}
                  </span>
                </div>
              ) : null
            )}
          </div>
        )}

        {/* Footer row: verdict + nova badge */}
        <div className="flex items-center justify-between mt-auto">
          <VerdictDot grade={grade} nova={nova} />
          {nova && (
            <span className="eyebrow-mono text-[var(--ink-500)]">
              NOVA {nova}
            </span>
          )}
        </div>

        {/* CTA — styled as ghost button, inherits the card's hover context */}
        <div
          className={cn(
            "block text-center py-2.5 text-[13px] font-medium text-[var(--ink-700)] no-underline",
            "border border-[var(--ink-200)] rounded-[10px]",
            "transition-colors duration-150",
            /* Group-hover darkens the CTA border/text for free */
            "group-hover:border-[var(--ink-400)] group-hover:text-[var(--ink-900)]"
          )}
          aria-hidden="true"         /* Link is on the <Link> wrapper above */
          tabIndex={-1}
        >
          Ver detalhes →
        </div>
      </div>
    </Link>
  );
}

/* ── Public export ──────────────────────────────────────────────────────── */
export function ProductCard({ variant = "default", ...props }: ProductCardProps) {
  if (variant === "mobile") return <MobileCard {...props} />;
  return <DefaultCard {...props} />;
}
