"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PriceChartProps {
  data: Array<{
    website: string
    price: number
    currency: string
  }>
}

export function PriceChart({ data }: PriceChartProps) {
  const chartData = data.map((item) => ({
    website: item.website.replace(".com", "").replace(".in", "").replace(".co.uk", ""),
    price: item.price,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Comparison Chart</CardTitle>
        <CardDescription>Visual comparison of prices across different websites</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="website" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
