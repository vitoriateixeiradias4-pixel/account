"use client"

import type React from "react"

import { useState } from "react"
import { Building2, Users, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AgencyRegistration() {
  const [formData, setFormData] = useState({
    companyName: "",
    cnpj: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    businessType: "",
    expectedVolume: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Agency registration:", formData)
  }

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-amber-600" />,
      title: "Comissões Especiais",
      description: "Ganhe comissões atrativas na venda de ingressos",
    },
    {
      icon: <FileText className="h-8 w-8 text-amber-600" />,
      title: "Material de Apoio",
      description: "Receba materiais promocionais e de divulgação",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-amber-600" />,
      title: "Suporte Dedicado",
      description: "Atendimento especializado para agências parceiras",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-germania">Cadastro de Agências</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Torne-se um parceiro oficial da Oktoberfest Blumenau e ofereça aos seus clientes a maior festa alemã das
            Américas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Vantagens para Agências Parceiras</h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{benefit.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-800">
                  <Building2 className="h-6 w-6 inline mr-2" />
                  Requisitos para Cadastro
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-amber-700">
                <p>• CNPJ ativo e regularizado</p>
                <p>• Experiência comprovada em turismo/eventos</p>
                <p>• Estrutura para atendimento ao cliente</p>
                <p>• Compromisso com vendas mensais mínimas</p>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Formulário de Cadastro</CardTitle>
              <CardDescription className="text-amber-100">
                Preencha os dados da sua empresa para iniciar a parceria
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Razão Social *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj}
                      onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                      placeholder="00.000.000/0000-00"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nome do Responsável *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(47) 99999-9999"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Tipo de Negócio *</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agencia-turismo">Agência de Turismo</SelectItem>
                        <SelectItem value="operadora">Operadora de Turismo</SelectItem>
                        <SelectItem value="hotel">Hotel/Pousada</SelectItem>
                        <SelectItem value="eventos">Empresa de Eventos</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado *</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, state: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="PR">PR</SelectItem>
                        <SelectItem value="RS">RS</SelectItem>
                        <SelectItem value="SP">SP</SelectItem>
                        <SelectItem value="RJ">RJ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">CEP *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="00000-000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedVolume">Volume Esperado de Vendas Mensais</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, expectedVolume: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma faixa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1 a 50 ingressos</SelectItem>
                      <SelectItem value="51-100">51 a 100 ingressos</SelectItem>
                      <SelectItem value="101-500">101 a 500 ingressos</SelectItem>
                      <SelectItem value="500+">Mais de 500 ingressos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição da Empresa</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Conte-nos mais sobre sua empresa e experiência no mercado..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 text-lg font-semibold"
                >
                  Enviar Solicitação de Cadastro
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  Após o envio, nossa equipe entrará em contato em até 48 horas úteis
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
