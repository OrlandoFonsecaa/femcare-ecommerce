"use client"

import type React from "react"

import { useState } from "react"
import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface DiscountFormProps {
  onApply: (discount: number) => void
}

export function DiscountForm({ onApply }: DiscountFormProps) {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isApplied, setIsApplied] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulación de verificación de código
    setTimeout(() => {
      setIsLoading(false)

      // Código para segunda compra
      if (code.toUpperCase() === "SEGUNDA10") {
        setIsApplied(true)
        onApply(10)
        toast({
          title: "¡Código aplicado!",
          description: "Se ha aplicado un 10% de descuento a tu compra.",
        })
      } else {
        setError("Código no válido o expirado")
      }
    }, 1000)
  }

  const handleReset = () => {
    setCode("")
    setIsApplied(false)
    setError("")
    onApply(0)
  }

  if (isApplied) {
    return (
      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
        <div className="flex items-center">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-sm">
            Código <strong>{code.toUpperCase()}</strong> aplicado (10% descuento)
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <Input
          placeholder="Código de descuento"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !code}>
          {isLoading ? "Aplicando..." : "Aplicar"}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <p className="text-xs text-muted-foreground">
        Usa el código <strong>SEGUNDA10</strong> si es tu segunda compra para obtener un 10% de descuento.
      </p>
    </form>
  )
}
