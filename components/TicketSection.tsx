"use client"

import { useState } from "react"
import { Calendar, Clock, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react"
import type { CartItem } from "@/app/page"

interface TicketSectionProps {
  onAddToCart: (item: Omit<CartItem, "quantity">) => void
}

export default function TicketSection({ onAddToCart }: TicketSectionProps) {
  const [selectedDate, setSelectedDate] = useState("2025-10-10")
  const [selectedTime, setSelectedTime] = useState("11:00")
  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({})
  const [rechargeQuantities, setRechargeQuantities] = useState<Record<string, number>>({})
  const [currentMonth, setCurrentMonth] = useState(9) // October (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025)

  const availableDates = [
    { date: "2025-10-10", day: "Sex", available: true },
    { date: "2025-10-11", day: "Sáb", available: true },
    { date: "2025-10-12", day: "Dom", available: true },
    { date: "2025-10-15", day: "Qua", available: true },
    { date: "2025-10-16", day: "Qui", available: true },
    { date: "2025-10-17", day: "Sex", available: true },
    { date: "2025-10-18", day: "Sáb", available: true },
    { date: "2025-10-19", day: "Dom", available: true },
    { date: "2025-10-22", day: "Qua", available: true },
    { date: "2025-10-23", day: "Qui", available: true },
    { date: "2025-10-24", day: "Sex", available: true },
    { date: "2025-10-25", day: "Sáb", available: true },
  ]

  const getPricingForDate = (dateString: string) => {
    const date = new Date(dateString)
    const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    if (dayOfWeek === 5) {
      // Friday
      return {
        fullPrice: 56.0,
        fullTax: 6.72,
        halfPrice: 28.0,
        halfTax: 3.36,
        defaultTime: "11:00",
      }
    } else if (dayOfWeek === 6) {
      // Saturday
      return {
        fullPrice: 70.0,
        fullTax: 8.4,
        halfPrice: 35.0,
        halfTax: 4.2,
        defaultTime: "10:00",
      }
    } else {
      // Sunday, Wednesday, Thursday
      return {
        fullPrice: 24.0,
        fullTax: 2.88,
        halfPrice: 12.0,
        halfTax: 2.88,
        defaultTime: dayOfWeek === 0 ? "10:00" : "11:00", // Sunday 10:00, Wed/Thu 11:00
      }
    }
  }

  const currentPricing = getPricingForDate(selectedDate)

  const tickets = [
    {
      id: "ticket-full",
      name: "Inteira",
      price: currentPricing.fullPrice,
      tax: currentPricing.fullTax,
      date: selectedDate,
      time: selectedTime,
    },
    {
      id: "ticket-half",
      name: "Meia-entrada",
      price: currentPricing.halfPrice,
      tax: currentPricing.halfTax,
      date: selectedDate,
      time: selectedTime,
    },
  ]

  const recharges = [
    { id: "recharge-10", name: "Recarga", price: 10.0, tax: 1.2 },
    { id: "recharge-50", name: "Recarga", price: 50.0, tax: 6.0 },
    { id: "recharge-100", name: "Recarga", price: 100.0, tax: 12.0 },
    { id: "recharge-200", name: "Recarga", price: 200.0, tax: 24.0 },
    { id: "recharge-500", name: "Recarga", price: 500.0, tax: 60.0 },
  ]

  const handleDateSelect = (dateString: string) => {
    setSelectedDate(dateString)
    const pricing = getPricingForDate(dateString)
    setSelectedTime(pricing.defaultTime)
  }

  const getAvailableTimes = (dateString: string) => {
    const date = new Date(dateString)
    const dayOfWeek = date.getDay()

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Sunday or Saturday
      return ["10:00"]
    } else {
      // Wednesday, Thursday, Friday
      return ["11:00"]
    }
  }

  const handleTicketQuantityChange = (ticketId: string, change: number) => {
    const newQuantity = Math.max(0, (ticketQuantities[ticketId] || 0) + change)
    setTicketQuantities((prev) => ({ ...prev, [ticketId]: newQuantity }))

    if (change > 0) {
      const ticket = tickets.find((t) => t.id === ticketId)
      if (ticket) {
        onAddToCart({
          id: `${ticket.id}-${ticket.date}-${ticket.time}`,
          name: ticket.name,
          price: ticket.price,
          tax: ticket.tax,
          date: ticket.date,
          time: ticket.time,
          type: "ticket",
        })
      }
    }
  }

  const handleRechargeQuantityChange = (rechargeId: string, change: number) => {
    const newQuantity = Math.max(0, (rechargeQuantities[rechargeId] || 0) + change)
    setRechargeQuantities((prev) => ({ ...prev, [rechargeId]: newQuantity }))

    if (change > 0) {
      const recharge = recharges.find((r) => r.id === rechargeId)
      if (recharge) {
        onAddToCart({
          id: recharge.id,
          name: recharge.name,
          price: recharge.price,
          tax: recharge.tax,
          type: "recharge",
        })
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      const dateString = `${current.getFullYear()}-${(current.getMonth() + 1).toString().padStart(2, "0")}-${current.getDate().toString().padStart(2, "0")}`
      const isCurrentMonth = current.getMonth() === currentMonth
      const isAvailable = availableDates.some((d) => d.date === dateString)
      const isSelected = selectedDate === dateString

      days.push({
        date: current.getDate(),
        dateString,
        isCurrentMonth,
        isAvailable,
        isSelected,
      })

      current.setDate(current.getDate() + 1)
    }

    return days
  }

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const calendarDays = generateCalendar()

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Escolha seus <span className="text-purple-600">Ingressos</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Selecione a data, horário e quantidade de ingressos para a Oktoberfest Blumenau 2025
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            {/* Tickets Card */}
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
              <div className="bg-purple-600 text-white p-6" style={{ backgroundColor: "#7c3aed", color: "#ffffff" }}>
                <h3 className="text-xl font-bold flex items-center justify-center" style={{ color: "#ffffff" }}>
                  <Calendar className="h-5 w-5 mr-2" />
                  Ingressos
                </h3>
              </div>

              {/* Calendar */}
              <div className="p-6">
                <div className="mb-6 max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-4 p-3 border-2 border-gray-900 rounded-xl">
                    <button
                      onClick={() => {
                        if (currentMonth === 0) {
                          setCurrentMonth(11)
                          setCurrentYear(currentYear - 1)
                        } else {
                          setCurrentMonth(currentMonth - 1)
                        }
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h4 className="font-bold text-lg uppercase tracking-wide">
                      {monthNames[currentMonth]} DE {currentYear}
                    </h4>
                    <button
                      onClick={() => {
                        if (currentMonth === 11) {
                          setCurrentMonth(0)
                          setCurrentYear(currentYear + 1)
                        } else {
                          setCurrentMonth(currentMonth + 1)
                        }
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["D", "S", "T", "Q", "Q", "S", "S"].map((day, dayIndex) => (
                      <div key={`day-${dayIndex}`} className="p-3 font-bold text-gray-600 text-sm">
                        {day}
                      </div>
                    ))}

                    {calendarDays.map((day, index) => (
                      <button
                        key={`calendar-${index}`}
                        onClick={() => day.isAvailable && handleDateSelect(day.dateString)}
                        disabled={!day.isAvailable}
                        className={`
                          p-3 rounded-lg text-sm font-semibold transition-all duration-200 min-h-[44px]
                          ${
                            day.isSelected
                              ? "bg-purple-600 text-white shadow-lg scale-105"
                              : day.isAvailable && day.isCurrentMonth
                                ? "hover:bg-purple-100 text-purple-600 hover:scale-105"
                                : day.isCurrentMonth
                                  ? "text-gray-900 font-bold"
                                  : "text-gray-300 cursor-not-allowed"
                          }
                        `}
                      >
                        {day.date}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6 text-center">
                  <h4 className="font-bold mb-3 flex items-center justify-center text-lg">
                    <Clock className="h-5 w-5 mr-2" />
                    Horários
                  </h4>
                  <div className="flex justify-center gap-2">
                    {getAvailableTimes(selectedDate).map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 ${
                          selectedTime === time
                            ? "bg-purple-600 text-white shadow-lg"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ticket List */}
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between p-4 border-2 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div>
                        <p className="text-sm text-gray-600 font-medium">
                          {formatDate(ticket.date)} - {ticket.time}
                        </p>
                        <p className="font-bold text-lg">{ticket.name}</p>
                        <p className="text-purple-600 font-bold text-xl">
                          R$ {ticket.price.toFixed(2).replace(".", ",")}
                        </p>
                        <p className="text-sm text-gray-500">Taxa: R$ {ticket.tax.toFixed(2).replace(".", ",")}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleTicketQuantityChange(ticket.id, -1)}
                          disabled={(ticketQuantities[ticket.id] || 0) === 0}
                          className="p-2 rounded-full bg-purple-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-lg">{ticketQuantities[ticket.id] || 0}</span>
                        <button
                          onClick={() => handleTicketQuantityChange(ticket.id, 1)}
                          className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recharge Card */}
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
              <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-purple-100">
                <h3 className="text-xl font-bold text-purple-600 flex items-center justify-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Recarga antecipada
                </h3>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {recharges.map((recharge) => (
                    <div
                      key={recharge.id}
                      className="flex items-center justify-between p-4 border-2 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div>
                        <p className="font-bold text-lg">{recharge.name}</p>
                        <p className="text-purple-600 font-bold text-xl">
                          R$ {recharge.price.toFixed(2).replace(".", ",")}
                        </p>
                        <p className="text-sm text-gray-500">Taxa: R$ {recharge.tax.toFixed(2).replace(".", ",")}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleRechargeQuantityChange(recharge.id, -1)}
                          disabled={(rechargeQuantities[recharge.id] || 0) === 0}
                          className="p-2 rounded-full bg-purple-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-lg">
                          {rechargeQuantities[recharge.id] || 0}
                        </span>
                        <button
                          onClick={() => handleRechargeQuantityChange(recharge.id, 1)}
                          className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
