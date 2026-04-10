'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Landmark, FileText, Building2, LineChart, Building, Bitcoin } from 'lucide-react'

const investments = [
  {
    id: 'cdb',
    name: 'CDB',
    fullName: 'Certificado de Depósito Bancário',
    icon: Landmark,
    color: 'bg-blue-500',
    category: 'Renda Fixa',
    description: 'Empreste seu dinheiro para o banco e receba juros em troca. É como se você fosse o banco emprestando para a instituição financeira.',
    whatIs: 'O CDB é um título de renda fixa emitido pelos bancos para captar recursos. Quando você investe em um CDB, está emprestando dinheiro ao banco, que devolve o valor com juros após um período determinado. Existem três tipos principais: prefixado (taxa fixa), pós-fixado (atrelado ao CDI) e híbrido (IPCA + taxa fixa).',
    howItWorks: 'Ao aplicar em um CDB, você escolhe o prazo e o tipo de rentabilidade. O banco utiliza seu dinheiro para operações de crédito e, no vencimento, você recebe o valor investido mais os juros acordados. A liquidez pode ser diária ou no vencimento, dependendo do produto.',
    pros: [
      'Segurança: protegido pelo FGC (Fundo Garantidor de Créditos) até R$ 250.000 por CPF e por instituição',
      'Rentabilidade previsível, especialmente nos prefixados',
      'Diversas opções de prazo e liquidez para diferentes objetivos',
      'Investimento mínimo geralmente baixo (a partir de R$ 1 em alguns bancos digitais)',
      'Facilidade de aplicação através de bancos e corretoras',
      'Opções com liquidez diária para reserva de emergência',
    ],
    cons: [
      'Imposto de Renda sobre os rendimentos (tabela regressiva de 22,5% a 15%)',
      'IOF nos primeiros 30 dias de aplicação',
      'Alguns CDBs têm carência, impedindo resgate antecipado',
      'Rentabilidade limitada comparada à renda variável no longo prazo',
      'Risco de crédito se o banco quebrar (limitado ao FGC)',
    ],
    riskLevel: 'Baixo',
    minimumInvestment: 'A partir de R$ 1',
    liquidity: 'Diária ou no vencimento',
    expectedReturn: '100% a 120% do CDI',
  },
  {
    id: 'tesouro',
    name: 'Tesouro Direto',
    fullName: 'Títulos Públicos Federais',
    icon: FileText,
    color: 'bg-emerald-500',
    category: 'Renda Fixa',
    description: 'Empreste dinheiro para o governo federal e receba juros. É considerado o investimento mais seguro do Brasil.',
    whatIs: 'O Tesouro Direto é um programa do governo federal que permite a compra de títulos públicos por pessoas físicas. Existem três tipos principais: Tesouro Selic (pós-fixado, atrelado à taxa Selic), Tesouro IPCA+ (híbrido, protege contra inflação) e Tesouro Prefixado (taxa fixa definida na compra).',
    howItWorks: 'Você compra títulos através de uma corretora cadastrada. O governo usa esse dinheiro para financiar suas atividades e, em troca, paga juros. Os títulos têm datas de vencimento específicas, mas podem ser vendidos antes no mercado secundário (com possível variação de preço).',
    pros: [
      'Maior segurança do mercado brasileiro (garantido pelo Tesouro Nacional)',
      'Diversas opções para diferentes objetivos e prazos',
      'Tesouro Selic tem liquidez diária sem volatilidade',
      'Tesouro IPCA+ protege o poder de compra contra a inflação',
      'Investimento mínimo muito acessível (a partir de R$ 30)',
      'Plataforma online fácil de usar',
      'Transparência nas taxas e rendimentos',
    ],
    cons: [
      'Imposto de Renda sobre os rendimentos (tabela regressiva)',
      'Taxa de custódia da B3 de 0,20% ao ano sobre o valor investido',
      'Tesouro Prefixado e IPCA+ podem ter oscilação negativa se vendidos antes do vencimento',
      'Necessidade de entender as diferenças entre os tipos de títulos',
    ],
    riskLevel: 'Muito Baixo',
    minimumInvestment: 'A partir de R$ 30',
    liquidity: 'Diária (D+1)',
    expectedReturn: 'Taxa Selic ou IPCA + taxa fixa',
  },
  {
    id: 'lci_lca',
    name: 'LCI/LCA',
    fullName: 'Letras de Crédito Imobiliário e do Agronegócio',
    icon: Building2,
    color: 'bg-cyan-500',
    category: 'Renda Fixa',
    description: 'Títulos isentos de Imposto de Renda que financiam os setores imobiliário e do agronegócio. Grande vantagem tributária para pessoa física.',
    whatIs: 'LCI e LCA são títulos de renda fixa emitidos por bancos para financiar os setores imobiliário (LCI) e do agronegócio (LCA). A grande vantagem é a isenção de Imposto de Renda para pessoas físicas, o que aumenta significativamente a rentabilidade líquida.',
    howItWorks: 'Funcionam de forma similar ao CDB: você empresta dinheiro ao banco, que usa os recursos para financiar esses setores específicos. No vencimento, recebe o valor investido mais os juros. Geralmente têm prazo mínimo de 90 dias (LCI) ou 90 dias (LCA).',
    pros: [
      'Isenção total de Imposto de Renda para pessoa física',
      'Protegido pelo FGC até R$ 250.000 por CPF e instituição',
      'Boa rentabilidade líquida (comparar com CDB após IR)',
      'Segurança de renda fixa com benefício fiscal',
      'Diversas opções de prazos e indexadores',
    ],
    cons: [
      'Geralmente exigem prazo mínimo de carência (90 dias)',
      'Valor mínimo de investimento costuma ser maior que CDBs',
      'Menor liquidez que outros investimentos de renda fixa',
      'Oferta pode ser limitada em alguns períodos',
      'Não são indicados para reserva de emergência',
    ],
    riskLevel: 'Baixo',
    minimumInvestment: 'A partir de R$ 1.000 (varia)',
    liquidity: 'No vencimento (carência mínima)',
    expectedReturn: '85% a 100% do CDI (isento de IR)',
  },
  {
    id: 'acoes',
    name: 'Ações',
    fullName: 'Ações de Empresas na Bolsa de Valores',
    icon: LineChart,
    color: 'bg-amber-500',
    category: 'Renda Variável',
    description: 'Torne-se sócio de grandes empresas e participe dos lucros. Maior potencial de retorno, mas também maior risco.',
    whatIs: 'Ações são pequenas frações do capital social de uma empresa. Ao comprar ações, você se torna sócio da empresa, participando dos lucros (dividendos) e da valorização do negócio. As ações são negociadas na Bolsa de Valores (B3) através de corretoras.',
    howItWorks: 'Você compra ações através de uma corretora, pagando o preço de mercado. O retorno vem de duas formas: valorização do preço das ações e distribuição de dividendos. É importante estudar as empresas antes de investir (análise fundamentalista) e diversificar a carteira.',
    pros: [
      'Potencial de altos retornos no longo prazo (historicamente superam a renda fixa)',
      'Recebimento de dividendos (participação nos lucros)',
      'Dividendos são isentos de Imposto de Renda',
      'Participação no crescimento de grandes empresas',
      'Alta liquidez (fácil compra e venda)',
      'Possibilidade de diversificação em diversos setores',
      'Proteção contra inflação no longo prazo',
    ],
    cons: [
      'Alta volatilidade (preços oscilam diariamente)',
      'Risco de perda significativa, especialmente no curto prazo',
      'Exige conhecimento e acompanhamento do mercado',
      'Não tem garantia de retorno positivo',
      'Sujeito a crises econômicas e eventos imprevistos',
      'IR de 15% sobre lucro na venda (20% em day trade)',
      'Pode gerar ansiedade em investidores iniciantes',
    ],
    riskLevel: 'Alto',
    minimumInvestment: 'Preço de 1 ação (varia)',
    liquidity: 'Alta (D+2)',
    expectedReturn: 'Variável (histórico: 10-15% a.a. real)',
  },
  {
    id: 'fii',
    name: 'FII',
    fullName: 'Fundos de Investimento Imobiliário',
    icon: Building,
    color: 'bg-violet-500',
    category: 'Renda Variável',
    description: 'Invista em imóveis sem precisar comprar um imóvel inteiro. Receba aluguéis mensais de forma prática.',
    whatIs: 'FIIs são fundos que investem em empreendimentos imobiliários (shoppings, escritórios, galpões, hospitais) ou em papéis do setor imobiliário (CRIs, LCIs). As cotas são negociadas na Bolsa como ações, e os rendimentos (aluguéis) são distribuídos mensalmente aos cotistas.',
    howItWorks: 'Você compra cotas do fundo através da Bolsa de Valores. O fundo investe em imóveis e distribui pelo menos 95% dos lucros (aluguéis) aos cotistas mensalmente. Você também pode ganhar com a valorização das cotas no mercado.',
    pros: [
      'Rendimentos mensais (distribuição de aluguéis)',
      'Dividendos isentos de IR para pessoa física',
      'Diversificação em imóveis com pouco dinheiro',
      'Gestão profissional dos imóveis',
      'Liquidez maior que imóveis físicos',
      'Acesso a grandes empreendimentos (shoppings, escritórios)',
      'Menor burocracia que comprar imóvel físico',
      'Não precisa lidar com inquilinos ou manutenção',
    ],
    cons: [
      'Volatilidade no preço das cotas (renda variável)',
      'Taxa de administração do fundo',
      'Risco de vacância dos imóveis (períodos sem inquilinos)',
      'Lucro na venda das cotas é tributado em 20%',
      'Sensível a variações na taxa de juros',
      'Alguns fundos têm baixa liquidez',
      'Risco de inadimplência de inquilinos',
    ],
    riskLevel: 'Médio-Alto',
    minimumInvestment: 'Preço de 1 cota (geralmente R$ 10 a R$ 200)',
    liquidity: 'Média (D+2)',
    expectedReturn: 'Dividendos: 0,5% a 1% ao mês + valorização',
  },
  {
    id: 'cripto',
    name: 'Bitcoin e Criptomoedas',
    fullName: 'Criptomoedas e Ativos Digitais',
    icon: Bitcoin,
    color: 'bg-orange-500',
    category: 'Cripto',
    description: 'Ativos digitais descentralizados com alto potencial de valorização, mas também alto risco. Tecnologia blockchain revolucionária.',
    whatIs: 'Criptomoedas são moedas digitais que utilizam criptografia para segurança e operam em redes descentralizadas (blockchain). O Bitcoin foi a primeira e é a mais conhecida, mas existem milhares de outras (Ethereum, Solana, etc.). São ativos altamente especulativos e voláteis.',
    howItWorks: 'Você compra criptomoedas através de exchanges (corretoras de cripto) ou ETFs na Bolsa. As transações são registradas em blockchain, uma tecnologia que garante transparência e segurança. O preço é determinado pela oferta e demanda do mercado global, 24 horas por dia.',
    pros: [
      'Potencial de alta valorização (histórico de grandes ganhos)',
      'Descentralizado e global (sem controle de governos)',
      'Proteção contra inflação (Bitcoin tem quantidade limitada: 21 milhões)',
      'Mercado funciona 24/7, todos os dias',
      'Facilidade de transferência internacional',
      'Tecnologia inovadora com múltiplas aplicações',
      'Diversificação da carteira (baixa correlação com outros ativos)',
    ],
    cons: [
      'Extremamente volátil (oscilações de 20-50% são comuns)',
      'Risco de perda total do investimento',
      'Regulamentação ainda incerta em muitos países',
      'Complexidade técnica para iniciantes',
      'Risco de golpes e exchanges fraudulentas',
      'Tributação: 15% a 22,5% sobre lucros acima de R$ 35.000/mês',
      'Não gera renda passiva (exceto staking)',
      'Impacto ambiental da mineração (algumas criptos)',
    ],
    riskLevel: 'Muito Alto',
    minimumInvestment: 'A partir de R$ 10',
    liquidity: 'Alta (24/7)',
    expectedReturn: 'Altamente variável e imprevisível',
  },
]

export function LearnToInvest() {
  const [selectedInvestment, setSelectedInvestment] = useState<typeof investments[0] | null>(null)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Aprenda a Investir</h2>
        <p className="text-muted-foreground">Conheça os principais tipos de investimento e escolha o melhor para você</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {investments.map((investment) => (
          <Card 
            key={investment.id}
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/50"
            onClick={() => setSelectedInvestment(investment)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${investment.color}`}>
                  <investment.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{investment.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1 text-xs">{investment.category}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2">{investment.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedInvestment} onOpenChange={() => setSelectedInvestment(null)}>
        {selectedInvestment && (
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${selectedInvestment.color}`}>
                  <selectedInvestment.icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl">{selectedInvestment.name}</DialogTitle>
                  <DialogDescription>{selectedInvestment.fullName}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{selectedInvestment.category}</Badge>
                <Badge variant="outline">Risco: {selectedInvestment.riskLevel}</Badge>
              </div>

              <div>
                <h4 className="font-semibold mb-2">O que é?</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{selectedInvestment.whatIs}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Como funciona?</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{selectedInvestment.howItWorks}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <span className="text-xs text-muted-foreground block">Investimento Mínimo</span>
                  <p className="font-medium text-sm">{selectedInvestment.minimumInvestment}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <span className="text-xs text-muted-foreground block">Liquidez</span>
                  <p className="font-medium text-sm">{selectedInvestment.liquidity}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <span className="text-xs text-muted-foreground block">Nível de Risco</span>
                  <p className="font-medium text-sm">{selectedInvestment.riskLevel}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <span className="text-xs text-muted-foreground block">Retorno Esperado</span>
                  <p className="font-medium text-sm">{selectedInvestment.expectedReturn}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-emerald-50 border-emerald-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-emerald-700">Vantagens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedInvestment.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-emerald-500 mt-0.5 flex-shrink-0">+</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 border-red-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-red-700">Desvantagens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedInvestment.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-red-500 mt-0.5 flex-shrink-0">-</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
