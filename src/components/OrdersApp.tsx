
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Menu, 
  Bell, 
  ChevronDown,
  ChevronUp,
  DollarSign,
  ShoppingBag,
  CheckCircle,
  Send,
  History,
  Filter,
  Clock,
  MapPin,
  User,
  ClipboardList,
  Briefcase,
  Package
} from "lucide-react";

// Estado inicial para o filtro de tipo de pedido
const initialOrderTypeFilter = {
  compra: true,
  servico: true,
};

// Dados do dashboard simulados
const dashboardData = {
  totalPedidos: 15,
  novosPedidos: 5,
  ganhosHoje: 120.50,
  tempoMedioEntrega: "45 min",
};

export default function OrdersApp() {
  const navigate = useNavigate();
  const [activeOrderTab, setActiveOrderTab] = useState("todos");
  const [orderTypeFilter, setOrderTypeFilter] = useState(initialOrderTypeFilter);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Pedidos simulados com tipos corrigidos
  const pedidos = {
    aceitos: [
      {
        id: 1,
        tipo: "compra",
        cliente: "Maria Silva",
        itens: ["Leite integral 1L", "Pão francês 500g", "Ovos 12un"],
        estabelecimento: "Mercado X",
        endereco: "Rua das Flores, 123 - Centro",
        valor: 15.00,
        status: "aceito",
        urgencia: "Alta",
        distancia: 1.2,
        tempo: "30 min",
        observacoes: "Leite da marca Tirol se possível"
      },
      {
        id: 2,
        tipo: "servico",
        cliente: "João Santos",
        servico: "Montagem de móvel",
        categoria: "Casa e Jardim",
        endereco: "Av. Central, 456 - Bairro Norte",
        valor: 50.00,
        status: "em-andamento",
        urgencia: "Média",
        distancia: 2.1,
        tempo: "2 horas",
        observacoes: "Guarda-roupa de 3 portas"
      }
    ],
    enviados: [
      {
        id: 3,
        tipo: "compra",
        aceito_por: "Carlos Lima",
        itens: ["Arroz 5kg", "Feijão 1kg"],
        estabelecimento: "Supermercado Big",
        valor: 12.00,
        status: "aguardando",
        urgencia: "Baixa",
        tempo: "1 hora"
      },
      {
        id: 4,
        tipo: "compra",
        aceito_por: "Ana Costa",
        itens: ["Medicamentos"],
        estabelecimento: "Farmácia Popular",
        valor: 8.00,
        status: "concluido",
        urgencia: "Alta",
        tempo: "45 min"
      }
    ]
  };

  // Função para aplicar os filtros de tipo de pedido
  const applyOrderTypeFilter = (pedido) => {
    return orderTypeFilter[pedido.tipo];
  };

  // Função para formatar o status do pedido
  const getStatusLabel = (status) => {
    switch(status) {
      case "aceito": return "Aceito";
      case "em-andamento": return "Em Andamento";
      case "aguardando": return "Aguardando";
      case "concluido": return "Concluído";
      default: return "Desconhecido";
    }
  };

  // Função para definir a cor do status do pedido
  const getStatusColor = (status) => {
    switch(status) {
      case "aceito": return "bg-green-100 text-green-600";
      case "em-andamento": return "bg-blue-100 text-blue-600";
      case "aguardando": return "bg-yellow-100 text-yellow-600";
      case "concluido": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  // Função para definir a cor da urgência do pedido
  const getUrgenciaColor = (urgencia) => {
    switch(urgencia) {
      case "Alta": return "bg-red-100 text-red-600";
      case "Média": return "bg-yellow-100 text-yellow-600";
      case "Baixa": return "bg-green-100 text-green-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  // Função para lidar com a mudança de filtro de tipo de pedido
  const handleOrderTypeFilterChange = (type) => {
    setOrderTypeFilter({
      ...orderTypeFilter,
      [type]: !orderTypeFilter[type],
    });
  };

  // Função para filtrar pedidos baseado na tab ativa
  const getPedidosFiltrados = () => {
    let pedidosFiltrados;
    switch(activeOrderTab) {
      case "aceitos":
        pedidosFiltrados = pedidos.aceitos;
        break;
      case "enviados":
        pedidosFiltrados = pedidos.enviados;
        break;
      default:
        pedidosFiltrados = [...pedidos.aceitos, ...pedidos.enviados];
        break;
    }

    return pedidosFiltrados.filter(applyOrderTypeFilter);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Azul */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 pt-12 pb-6">
        {/* Navbar Superior */}
        <div className="flex items-center justify-between mb-4">
          <button className="p-2 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
            <Menu className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl font-bold">Pedidos</h1>
          <button className="p-2 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm relative">
            <Bell className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
        
        {/* Header Content */}
        <div className="mb-4">
          <p className="text-blue-100 text-sm">Dashboard</p>
          <h2 className="text-white text-2xl font-bold">
            {dashboardData.totalPedidos} pedidos
          </h2>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white bg-opacity-15 backdrop-blur-sm p-4 rounded-xl text-white">
            <p className="text-blue-100 text-sm mb-1">Novos pedidos</p>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <span className="text-xl font-bold">{dashboardData.novosPedidos}</span>
            </div>
          </div>
          <div className="bg-white bg-opacity-15 backdrop-blur-sm p-4 rounded-xl text-white">
            <p className="text-blue-100 text-sm mb-1">Ganhos hoje</p>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              <span className="text-xl font-bold">{dashboardData.ganhosHoje.toFixed(2)}</span>
            </div>
          </div>
          <div className="bg-white bg-opacity-15 backdrop-blur-sm p-4 rounded-xl text-white col-span-2">
            <p className="text-blue-100 text-sm mb-1">Tempo médio de entrega</p>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-xl font-bold">{dashboardData.tempoMedioEntrega}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-28">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveOrderTab("todos")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeOrderTab === "todos"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveOrderTab("aceitos")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeOrderTab === "aceitos"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Aceitos
            </button>
            <button
              onClick={() => setActiveOrderTab("enviados")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeOrderTab === "enviados"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Enviados
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-between w-full text-gray-600"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <span>Filtrar por tipo</span>
            </div>
            {isFilterOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {isFilterOpen && (
            <div className="mt-4 space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={orderTypeFilter.compra}
                  onChange={() => handleOrderTypeFilterChange("compra")}
                />
                Compras
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={orderTypeFilter.servico}
                  onChange={() => handleOrderTypeFilterChange("servico")}
                />
                Serviços
              </label>
            </div>
          )}
        </div>

        {/* Lista de Pedidos */}
        <div className="space-y-4">
          {getPedidosFiltrados().map((pedido) => (
            <div key={pedido.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-800">
                      {'cliente' in pedido ? pedido.cliente : `Aceito por: ${pedido.aceito_por}`}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pedido.status)}`}>
                      {getStatusLabel(pedido.status)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgenciaColor(pedido.urgencia)}`}>
                      {pedido.urgencia}
                    </span>
                  </div>
                  
                  {pedido.tipo === "compra" ? (
                    <>
                      <div className="text-sm text-gray-700 mb-1">
                        <span className="font-medium">{pedido.estabelecimento}</span>
                      </div>
                      
                      {'endereco' in pedido && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{pedido.endereco}</span>
                          {'distancia' in pedido && (
                            <>
                              <span>•</span>
                              <span>{pedido.distancia}km</span>
                            </>
                          )}
                        </div>
                      )}

                      <div className="text-gray-700 mb-2">
                        <span className="font-medium">{pedido.itens.length} {pedido.itens.length === 1 ? 'item' : 'itens'}</span>
                        <span className="text-gray-500 ml-2">{pedido.itens.join(", ")}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {'categoria' in pedido && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{pedido.categoria}</span>
                        </div>
                      )}
                      
                      {'endereco' in pedido && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{pedido.endereco}</span>
                          {'distancia' in pedido && (
                            <>
                              <span>•</span>
                              <span>{pedido.distancia}km</span>
                            </>
                          )}
                        </div>
                      )}
                      
                      {'servico' in pedido && (
                        <div className="text-gray-700 mb-2">
                          <span className="font-medium">Serviço:</span> {pedido.servico}
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{pedido.tempo}</span>
                    </div>
                  </div>
                  
                  {'observacoes' in pedido && pedido.observacoes && (
                    <p className="text-sm text-gray-600 italic">"{pedido.observacoes}"</p>
                  )}
                </div>
                
                <div className="text-right ml-4">
                  <div className="flex items-center gap-1 text-blue-600 font-bold text-lg">
                    <DollarSign className="w-4 h-4" />
                    <span>{pedido.valor.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Enviar</span>
                  </div>
                </button>
                <button className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4" />
                    <span>Histórico</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há pedidos */}
        {getPedidosFiltrados().length === 0 && (
          <div className="text-center py-12">
            <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum pedido encontrado</p>
            <p className="text-sm text-gray-400">
              Verifique os filtros ou tente novamente mais tarde.
            </p>
          </div>
        )}
      </div>

      {/* Navbar Inferior Fixa */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center border-t bg-white p-3 shadow-lg z-50">
        <button 
          onClick={() => navigate("/")}
          className="flex flex-col items-center py-2 px-4 rounded-lg text-gray-600"
        >
          <ShoppingBag className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium">BuyForMe</span>
        </button>
        
        <button 
          onClick={() => navigate("/")}
          className="flex flex-col items-center py-2 px-4 rounded-lg text-gray-600"
        >
          <Briefcase className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium">MakeForMe</span>
        </button>
        
        <button className="flex flex-col items-center py-2 px-4 rounded-lg bg-blue-50 text-blue-600">
          <ClipboardList className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium">Pedidos</span>
        </button>
        
        <button 
          onClick={() => navigate("/account")}
          className="flex flex-col items-center py-2 px-4 rounded-lg text-gray-600"
        >
          <div className="w-5 h-5 mb-1  flex items-center justify-center">
            <User className="w-3 h-3 text-gray-400" />
          </div>
          <span className="text-xs font-medium">Conta</span>
        </button>
      </div>
    </div>
  );
}
