'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

export function PageTitle() {
    const { theme } = useTheme()

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <h1 className="text-4xl md:text-5xl font-bold text-center">
                <span className="relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Resenha Itapoá
                    </span>
                    <motion.span
                        className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    />
                </span>
            </h1>
            <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
                Gerencie suas listas de compras de forma simples e eficiente
            </p>
        </motion.div>
    )
}