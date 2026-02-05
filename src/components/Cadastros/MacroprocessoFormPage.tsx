/**
 * GPS 2.0 - Macroprocesso Form Page (Cadastros)
 * Página de cadastro/edição de macroprocesso
 */

import { useState } from 'react';
import { ArrowLeft, ChevronRight, ChevronDown, Boxes, GitBranch, Route, Search, HelpCircle, Building2, Users, Target, Settings, Clock, TrendingUp } from 'lucide-react';
import './ProcessoFormPage.css';

interface MacroprocessoFormData {
  // Hierarquia
  jornada: string;
  dominio: string;
  businessUnit: string;
  vp: string;
  // Dados do macroprocesso
  codigo: string;
  nome: string;
  descricao: string;
  responsavel: string;
  // Características
  objetivo: string;
  natureza: string;
  complexidade: string;
  maturidade: string;
  frequencia: string;
  impactoNegocio: string;
  status: string;
}

interface MacroprocessoFormPageProps {
  onBack: () => void;
  onSubmit?: (data: MacroprocessoFormData) => void;
}

// Mock data for dropdowns
const mockJornadas = [
  { id: '1', nome: 'Processo de Seleção' },
  { id: '2', nome: 'Integração de Colaboradores' },
  { id: '3', nome: 'Desenvolvimento de Carreira' },
  { id: '4', nome: 'Captação de Alunos' },
];

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

const naturezaOptions = [
  { value: 'estrategico', label: 'Estratégico' },
  { value: 'tatico', label: 'Tático' },
  { value: 'operacional', label: 'Operacional' },
];

const complexidadeOptions = [
  { value: 'baixa', label: 'Baixa' },
  { value: 'media', label: 'Média' },
  { value: 'alta', label: 'Alta' },
  { value: 'muito_alta', label: 'Muito Alta' },
];

const maturidadeOptions = [
  { value: 'inicial', label: 'Inicial - Ad hoc' },
  { value: 'repetivel', label: 'Repetível - Documentado' },
  { value: 'definido', label: 'Definido - Padronizado' },
  { value: 'gerenciado', label: 'Gerenciado - Mensurado' },
  { value: 'otimizado', label: 'Otimizado - Melhoria contínua' },
];

const frequenciaOptions = [
  { value: 'continuo', label: 'Contínuo' },
  { value: 'diario', label: 'Diário' },
  { value: 'semanal', label: 'Semanal' },
  { value: 'mensal', label: 'Mensal' },
  { value: 'trimestral', label: 'Trimestral' },
  { value: 'anual', label: 'Anual' },
  { value: 'sob_demanda', label: 'Sob Demanda' },
];

const impactoOptions = [
  { value: 'critico', label: 'Crítico - Impacta receita diretamente' },
  { value: 'alto', label: 'Alto - Impacta operação essencial' },
  { value: 'medio', label: 'Médio - Impacta eficiência' },
  { value: 'baixo', label: 'Baixo - Impacto limitado' },
];

const statusOptions = [
  { value: 'ativo', label: 'Ativo' },
  { value: 'em_revisao', label: 'Em Revisão' },
  { value: 'em_implementacao', label: 'Em Implementação' },
  { value: 'inativo', label: 'Inativo' },
];

export function MacroprocessoFormPage({ onBack, onSubmit }: MacroprocessoFormPageProps) {
  const [formData, setFormData] = useState<MacroprocessoFormData>({
    jornada: '',
    dominio: '',
    businessUnit: '',
    vp: '',
    codigo: 'MAC032',
    nome: '',
    descricao: '',
    responsavel: '',
    objetivo: '',
    natureza: '',
    complexidade: '',
    maturidade: '',
    frequencia: '',
    impactoNegocio: '',
    status: 'ativo',
  });

  const handleInputChange = (field: keyof MacroprocessoFormData, value: string) => {
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
            <span>Macroprocessos</span>
            <ChevronRight size={16} />
            <span className="processo-form-breadcrumb-current">Novo macroprocesso</span>
          </nav>
        </div>
        <div className="processo-form-title-section">
          <span className="processo-form-code">{formData.codigo}</span>
          <h1 className="processo-form-title">Novo macroprocesso</h1>
        </div>
      </header>

      {/* Main content */}
      <div className="processo-form-content">
        <main className="processo-form-main" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 className="processo-form-section-header">Informações do Macroprocesso</h2>

          {/* Hierarquia */}
          <section className="form-section">
            <h3 className="form-section-title">
              <Boxes size={18} style={{ marginRight: '0.5rem', color: 'var(--color-primary-40)' }} />
              Hierarquia
            </h3>

            <div className="form-row form-row--2">
              <div className="form-field">
                <label className="form-label">
                  Jornada*
                  <button className="form-help-btn" title="Selecione a jornada pai">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-select-wrapper">
                  <div className="form-select-icon">
                    <GitBranch size={16} />
                  </div>
                  <select
                    className="form-select form-select--with-icon"
                    value={formData.jornada}
                    onChange={(e) => handleInputChange('jornada', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {mockJornadas.map(j => (
                      <option key={j.id} value={j.id}>{j.nome}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Domínio*
                  <button className="form-help-btn" title="Selecione o domínio">
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
            </div>

            <div className="form-row form-row--2">
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

          {/* Dados do Macroprocesso */}
          <section className="form-section">
            <h3 className="form-section-title">Dados do Macroprocesso</h3>

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
                  Nome do Macroprocesso*
                  <button className="form-help-btn" title="Informe o nome do macroprocesso">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex.: Entrevistas e Avaliações"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Descrição do Macroprocesso</label>
              <textarea
                className="form-textarea"
                placeholder="Descreva o escopo e as principais atividades deste macroprocesso..."
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                maxLength={500}
              />
              <span className="form-char-count">{formData.descricao.length}/500</span>
            </div>

            <div className="form-field">
              <label className="form-label">
                <Target size={14} style={{ marginRight: '0.25rem' }} />
                Objetivo do Macroprocesso*
              </label>
              <textarea
                className="form-textarea"
                placeholder="Qual o objetivo principal deste macroprocesso? Ex.: Avaliar competências técnicas e comportamentais dos candidatos"
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
                <button className="form-help-btn" title="Selecione o responsável pelo macroprocesso">
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
              <Settings size={18} style={{ marginRight: '0.5rem', color: 'var(--color-primary-40)' }} />
              Características
            </h3>

            <div className="form-row form-row--3">
              <div className="form-field">
                <label className="form-label">
                  Natureza*
                  <button className="form-help-btn" title="Classifique a natureza do macroprocesso">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={formData.natureza}
                    onChange={(e) => handleInputChange('natureza', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {naturezaOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Complexidade*
                  <button className="form-help-btn" title="Defina o nível de complexidade">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={formData.complexidade}
                    onChange={(e) => handleInputChange('complexidade', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {complexidadeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  <TrendingUp size={14} style={{ marginRight: '0.25rem' }} />
                  Nível de Maturidade*
                </label>
                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={formData.maturidade}
                    onChange={(e) => handleInputChange('maturidade', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {maturidadeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>
            </div>

            <div className="form-row form-row--3">
              <div className="form-field">
                <label className="form-label">
                  <Clock size={14} style={{ marginRight: '0.25rem' }} />
                  Frequência de Execução*
                </label>
                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={formData.frequencia}
                    onChange={(e) => handleInputChange('frequencia', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {frequenciaOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Impacto no Negócio*
                  <button className="form-help-btn" title="Avalie o impacto no negócio">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={formData.impactoNegocio}
                    onChange={(e) => handleInputChange('impactoNegocio', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {impactoOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Status*
                  <button className="form-help-btn" title="Defina o status atual">
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
          Salvar Macroprocesso
        </button>
      </footer>
    </div>
  );
}
