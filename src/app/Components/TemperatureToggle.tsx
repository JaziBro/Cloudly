import { Button } from "@/components/ui/button"

interface TemperatureToggleProps {
  unit: "celsius" | "fahrenheit"
  onToggle: () => void
}

export function TemperatureToggle({ unit, onToggle }: TemperatureToggleProps) {
  return (
    <Button
      variant="outline"
      onClick={onToggle}
      className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm cursor-pointer"
    >
      {unit === "celsius" ? "°C" : "°F"}
    </Button>
  )
}

