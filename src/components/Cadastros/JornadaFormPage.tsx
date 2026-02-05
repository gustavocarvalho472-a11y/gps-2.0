/**
 * GPS 2.0 - Jornada Form Page (Cadastros)
 * Página de cadastro/edição de jornada
 */

import { useState } from 'react';
import { ArrowLeft, ChevronRight, ChevronDown, GitBranch, Route, Search, HelpCircle, Building2, Users, Target, Zap } from 'lucide-react';
import './ProcessoFormPage.css';

interface JornadaFormData {
  // Hierarquia
  dominio: string;
  businessUnit: string;
  vp: string;
  // Dados da jornada
  codigo: string;
  nome: string;
  descricao: string;
  responsavel: string;
  // Características
  tipo: string;
  objetivo: string;
  publicoAlvo: string;
  criticidade: string;
  status: string;
}

interface JornadaFormPageProps {
  onBack: () => void;
  onSubmit?: (data: JornadaFormData) => void;
}

// Mock data for dropdowns
const mockDominios = [
  { id: '1', nome: 'Onboarding de Funcionários' },
  { id: '2', nome: 'Gestão de Talentos' },
  { id: '3', nome: 'Operações Acadêmicas' },
  { id: '4', nome: 'Relacionamento com Aluno' },
];

const mockBUs = [
  { id: '1', nome: 'PLATAFORMA TECNOLOGIA' },
  { id: '2', nome: 'KROTON' },
  { id: '3', nome: 'VASTA' },
  { id: '4', nome: 'SABER' },
];

const mockVPs = [
  { id: '1', nome: '(VPTECH) EQUIPE PÓS E OPM' },
  { id: '2', nome: '(VPTECH) EQUIPE GRADUAÇÃO' },
  { id: '3', nome: '(VPCORP) CORPORATIVO' },
];

const tipoJornadaOptions = [
  { value: 'cliente', label: 'Jornada do Cliente' },
  { value: 'colaborador', label: 'Jornada do Colaborador' },
  { value: 'parceiro', label: 'Jornada do Parceiro' },
  { value: 'fornecedor', label: 'Jornada do Fornecedor' },
  { value: 'interna', label: 'Jornada Interna' },
];

const publicoAlvoOptions = [
  { value: 'alunos', label: 'Alunos' },
  { value: 'colaboradores', label: 'Colaboradores' },
  { value: 'parceiros', label: 'Parceiros de Negócio' },
  { value: 'fornecedores', label: 'Fornecedores' },
  { value: 'gestores', label: 'Gestores' },
  { value: 'todos', label: 'Todos' },
];

const criticidadeOptions = [
  { value: 'critica', label: 'Crítica' },
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' },
];

const statusOptions = [
  { value: 'ativo', label: 'Atualizado' },
  { value: 'em_revisao', label: 'Desatualizado' },
];

export function JornadaFormPage({ onBack, onSubmit }: JornadaFormPageProps) {
  const [formData, setFormData] = useState<JornadaFormData>({
    dominio: '',
    businessUnit: '',
    vp: '',
    codigo: 'JOR015',
    nome: '',
    descricao: '',
    responsavel: '',
    tipo: '',
    objetivo: '',
    publicoAlvo: '',
    criticidade: '',
    status: 'ativo',
  });

  const handleInputChange = (field: keyof JornadaFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="processo-form-page">
      {/* Header */}
      <header className="processo-form-header">
        <div className="processo-form-nav">
          <button className="processo-form-back" onClick={onBack}>
            <ArrowLeft size={16} />
          </button>
          <nav className="processo-form-breadcrumb">
            <span>Cadastros</span>
            <ChevronRight size={16} />
            <span>Jornadas</span>
            <ChevronRight size={16} />
            <span className="processo-form-breadcrumb-current">Nova jornada</span>
          </nav>
        </div>
        <div className="processo-form-title-section">
          <span className="processo-form-code">{formData.codigo}</span>
          <h1 className="processo-form-title">Nova jornada</h1>
        </div>
      </header>

      {/* Main content */}
      <div className="processo-form-content">
        <main className="processo-form-main" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="processo-form-section-header">Informações da Jornada</h2>

          {/* Hierarquia */}
          <section className="form-section">
            <h3 className="form-section-title">
              <GitBranch size={18} style={{ marginRight: '0.5rem', color: 'var(--color-primary-40)' }} />
              Hierarquia
            </h3>

            <div className="form-row form-row--3">
              <div className="form-field">
                <label className="form-label">
                  Domínio*
                  <button className="form-help-btn" title="Selecione o domínio pai">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-select-wrapper">
                  <div className="form-select-icon">
                    <Route size={16} />
                  </div>
                  <select
                    className="form-select form-select--with-icon"
                    value={formData.dominio}
                    onChange={(e) => handleInputChange('dominio', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {mockDominios.map(d => (
                      <option key={d.id} value={d.id}>{d.nome}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Business Unit*
                  <button className="form-help-btn" title="Selecione a Business Unit">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-select-wrapper">
                  <div className="form-select-icon">
                    <Building2 size={16} />
                  </div>
                  <select
                    className="form-select form-select--with-icon"
                    value={formData.businessUnit}
                    onChange={(e) => handleInputChange('businessUnit', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {mockBUs.map(bu => (
                      <option key={bu.id} value={bu.id}>{bu.nome}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  VP*
                  <button className="form-help-btn" title="Selecione o VP">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-select-wrapper">
                  <div className="form-select-icon">
                    <Users size={16} />
                  </div>
                  <select
                    className="form-select form-select--with-icon"
                    value={formData.vp}
                    onChange={(e) => handleInputChange('vp', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {mockVPs.map(vp => (
                      <option key={vp.id} value={vp.id}>{vp.nome}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>
            </div>
          </section>

          {/* Dados da Jornada */}
          <section className="form-section">
            <h3 className="form-section-title">Dados da Jornada</h3>

            <div className="form-row form-row--2">
              <div className="form-field">
                <label className="form-label">
                  Código (automático)
                  <button className="form-help-btn" title="Código gerado automaticamente">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <input
                  type="text"
                  className="form-input form-input--disabled"
                  value={formData.codigo}
                  disabled
                />
              </div>

              <div className="form-field">
                <label className="form-label">
                  Nome da Jornada*
                  <button className="form-help-btn" title="Informe o nome da jornada">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex.: Processo de Seleção"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Descrição da Jornada</label>
              <textarea
                className="form-textarea"
                placeholder="Descreva o propósito e contexto desta jornada..."
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                maxLength={500}
              />
              <span className="form-char-count">{formData.descricao.length}/500</span>
            </div>

            <div className="form-field">
              <label className="form-label">
                <Target size={14} style={{ marginRight: '0.25rem' }} />
                Objetivo da Jornada*
              </label>
              <textarea
                className="form-textarea"
                placeholder="Qual o objetivo principal desta jornada? Ex.: Garantir uma experiência de contratação ágil e eficiente"
                value={formData.objetivo}
                onChange={(e) => handleInputChange('objetivo', e.target.value)}
                maxLength={200}
                style={{ minHeight: '60px' }}
              />
              <span className="form-char-count">{formData.objetivo.length}/200</span>
            </div>

            <div className="form-field">
              <label className="form-label">
                Responsável*
                <button className="form-help-btn" title="Selecione o responsável pela jornada">
                  <HelpCircle size={14} />
                </button>
              </label>
              <div className="form-search-wrapper">
                <input
                  type="text"
                  className="form-input form-input--search"
                  placeholder="Buscar responsável..."
                  value={formData.responsavel}
                  onChange={(e) => handleInputChange('responsavel', e.target.value)}
                />
                <Search className="form-search-icon" size={16} />
              </div>
            </div>
          </section>

          {/* Características */}
          <section className="form-section">
            <h3 className="form-section-title">
              <Zap size={18} style={{ marginRight: '0.5rem', color: 'var(--color-primary-40)' }} />
              Características
            </h3>

            <div className="form-row form-row--2">
              <div className="form-field">
                <label className="form-label">
                  Tipo de Jornada*
                  <button className="form-help-btn" title="Classifique o tipo da jornada">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={formData.tipo}
                    onChange={(e) => handleInputChange('tipo', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {tipoJornadaOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Público-Alvo*
                  <button className="form-help-btn" title="Quem é impactado por esta jornada">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={formData.publicoAlvo}
                    onChange={(e) => handleInputChange('publicoAlvo', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {publicoAlvoOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>
            </div>

            <div className="form-row form-row--2">
              <div className="form-field">
                <label className="form-label">
                  Criticidade*
                  <button className="form-help-btn" title="Defina o nível de criticidade">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={formData.criticidade}
                    onChange={(e) => handleInputChange('criticidade', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {criticidadeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Status*
                  <button className="form-help-btn" title="Defina o status">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    {statusOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="processo-form-footer">
        <button className="processo-form-btn processo-form-btn--secondary" onClick={onBack}>
          Cancelar
        </button>
        <button className="processo-form-btn processo-form-btn--primary" onClick={handleSubmit}>
          Salvar Jornada
        </button>
      </footer>
    </div>
  );
}
