/**
 * GPS 2.0 - Processo Form Page (Cadastros)
 * Página de cadastro/edição de processo
 */

import { useState } from 'react';
import { ArrowLeft, ChevronRight, ChevronDown, ListChecks, Workflow, Package, BarChart3, FileText, CheckCircle, Search, Info, HelpCircle, Boxes, GitBranch, Layers } from 'lucide-react';
import './ProcessoFormPage.css';

type FormTab = 'informacoes' | 'etapas' | 'produtos' | 'dados' | 'documentos' | 'aprovacoes';

interface ProcessoFormData {
  // Hierarquia
  macroprocesso: string;
  jornada: string;
  dominio: string;
  businessUnit: string;
  vp: string;
  // Dados do processo
  codigo: string;
  nome: string;
  objetivo: string;
  responsavel: string;
  // Características
  duracao: string;
  frequenciaAtualizacao: string;
  grauAutomatizacao: string;
  grauSuporteAnalitico: string;
  naturezaExecucao: string;
  ligadoMWB: boolean;
}

interface ProcessoFormPageProps {
  onBack: () => void;
  onSubmit?: (data: ProcessoFormData) => void;
}

const tabs = [
  { id: 'informacoes' as FormTab, label: 'Informações básicas', icon: ListChecks },
  { id: 'etapas' as FormTab, label: 'Etapas do processo', icon: Workflow },
  { id: 'produtos' as FormTab, label: 'Produtos', icon: Package },
  { id: 'dados' as FormTab, label: 'Dados e análises', icon: BarChart3 },
  { id: 'documentos' as FormTab, label: 'Documentos', icon: FileText },
  { id: 'aprovacoes' as FormTab, label: 'Aprovações', icon: CheckCircle },
];

// Mock data for dropdowns
const mockMacroprocessos = [
  { id: '1', nome: 'Entrevistas e avaliações' },
  { id: '2', nome: 'Recrutamento' },
  { id: '3', nome: 'Treinamento' },
];

const mockJornadas = [
  { id: '1', nome: 'Processo de seleção' },
  { id: '2', nome: 'Integração' },
  { id: '3', nome: 'Desenvolvimento' },
];

const mockDominios = [
  { id: '1', nome: 'Onboarding de funcionários' },
  { id: '2', nome: 'Gestão de Talentos' },
  { id: '3', nome: 'Operações' },
];

const mockBUs = [
  { id: '1', nome: 'PLATAFORMA TECNOLOGIA' },
  { id: '2', nome: 'KROTON' },
  { id: '3', nome: 'VASTA' },
];

const mockVPs = [
  { id: '1', nome: '(VPTECH) EQUIPE PÓS E OPM' },
  { id: '2', nome: '(VPTECH) EQUIPE GRADUAÇÃO' },
  { id: '3', nome: '(VPCORP) CORPORATIVO' },
];

const duracaoOptions = [
  { value: 'diario', label: 'Diário' },
  { value: 'semanal', label: 'Semanal' },
  { value: 'mensal', label: 'Mensal' },
  { value: 'trimestral', label: 'Trimestral' },
  { value: 'anual', label: 'Anual' },
];

const frequenciaOptions = [
  { value: 'diaria', label: 'Diária' },
  { value: 'semanal', label: 'Semanal' },
  { value: 'mensal', label: 'Mensal' },
  { value: 'trimestral', label: 'Trimestral' },
  { value: 'semestral', label: 'Semestral' },
];

const automatizacaoOptions = [
  { value: 'manual', label: 'Manual' },
  { value: 'parcial', label: 'Parcialmente automatizado' },
  { value: 'alto', label: 'Alto grau de automatização' },
  { value: 'total', label: 'Totalmente automatizado' },
];

const suporteAnaliticoOptions = [
  { value: 'baixo', label: 'Baixo' },
  { value: 'medio', label: 'Médio' },
  { value: 'alto', label: 'Alto' },
];

const naturezaExecucaoOptions = [
  { value: 'operacional', label: 'Operacional' },
  { value: 'tatico', label: 'Tático' },
  { value: 'estrategico', label: 'Estratégico' },
];

export function ProcessoFormPage({ onBack, onSubmit }: ProcessoFormPageProps) {
  const [activeTab, setActiveTab] = useState<FormTab>('informacoes');
  const [formData, setFormData] = useState<ProcessoFormData>({
    macroprocesso: '',
    jornada: '',
    dominio: '',
    businessUnit: '',
    vp: '',
    codigo: 'PROC005',
    nome: '',
    objetivo: '',
    responsavel: '',
    duracao: '',
    frequenciaAtualizacao: '',
    grauAutomatizacao: '',
    grauSuporteAnalitico: '',
    naturezaExecucao: '',
    ligadoMWB: false,
  });

  const handleInputChange = (field: keyof ProcessoFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'informacoes':
        return (
          <>
            {/* Hierarquia */}
            <section className="form-section">
              <h3 className="form-section-title">Hierarquia</h3>

              <div className="form-row form-row--3">
                <div className="form-field">
                  <label className="form-label">
                    Macroprocesso*
                    <button className="form-help-btn" title="Selecione o macroprocesso">
                      <HelpCircle size={14} />
                    </button>
                  </label>
                  <div className="form-select-wrapper">
                    <div className="form-select-icon">
                      <Boxes size={16} />
                    </div>
                    <select
                      className="form-select form-select--with-icon"
                      value={formData.macroprocesso}
                      onChange={(e) => handleInputChange('macroprocesso', e.target.value)}
                    >
                      <option value="">Selecionar</option>
                      {mockMacroprocessos.map(m => (
                        <option key={m.id} value={m.id}>{m.nome}</option>
                      ))}
                    </select>
                    <ChevronDown className="form-select-chevron" size={16} />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">
                    Jornada
                    <button className="form-help-btn" title="Selecione a jornada">
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
                    Domínio
                    <button className="form-help-btn" title="Selecione o domínio">
                      <HelpCircle size={14} />
                    </button>
                  </label>
                  <div className="form-select-wrapper">
                    <div className="form-select-icon">
                      <Layers size={16} />
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
                    <select
                      className="form-select"
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
                    <select
                      className="form-select"
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

            {/* Dados do processo */}
            <section className="form-section">
              <h3 className="form-section-title">Dados do processo</h3>

              <div className="form-row form-row--2">
                <div className="form-field">
                  <label className="form-label">
                    Código do processo (automático)
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
                    Nome do processo*
                    <button className="form-help-btn" title="Informe o nome do processo">
                      <HelpCircle size={14} />
                    </button>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Insira o nome do processo"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Objetivo do processo*</label>
                <textarea
                  className="form-textarea"
                  placeholder="Descreva o objetivo do processo. Ex.: Mapear oportunidades de novos negócios"
                  value={formData.objetivo}
                  onChange={(e) => handleInputChange('objetivo', e.target.value)}
                  maxLength={100}
                />
                <span className="form-char-count">{formData.objetivo.length}/100</span>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Responsável*
                  <button className="form-help-btn" title="Selecione o responsável">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-search-wrapper">
                  <input
                    type="text"
                    className="form-input form-input--search"
                    placeholder="Selecione o responsável pelo processo"
                    value={formData.responsavel}
                    onChange={(e) => handleInputChange('responsavel', e.target.value)}
                  />
                  <Search className="form-search-icon" size={16} />
                </div>
              </div>
            </section>

            {/* Características do processo */}
            <section className="form-section">
              <h3 className="form-section-title">Características do processo</h3>

              <div className="form-row form-row--2">
                <div className="form-field">
                  <label className="form-label">
                    Duração do processo*
                    <button className="form-help-btn" title="Selecione a duração">
                      <HelpCircle size={14} />
                    </button>
                  </label>
                  <div className="form-select-wrapper">
                    <select
                      className="form-select"
                      value={formData.duracao}
                      onChange={(e) => handleInputChange('duracao', e.target.value)}
                    >
                      <option value="">Selecionar</option>
                      {duracaoOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="form-select-chevron" size={16} />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">
                    Frequência de atualização*
                    <button className="form-help-btn" title="Selecione a frequência">
                      <HelpCircle size={14} />
                    </button>
                  </label>
                  <div className="form-select-wrapper">
                    <select
                      className="form-select"
                      value={formData.frequenciaAtualizacao}
                      onChange={(e) => handleInputChange('frequenciaAtualizacao', e.target.value)}
                    >
                      <option value="">Selecionar</option>
                      {frequenciaOptions.map(opt => (
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
                    Grau de automatização*
                    <button className="form-help-btn" title="Selecione o grau">
                      <HelpCircle size={14} />
                    </button>
                  </label>
                  <div className="form-select-wrapper">
                    <select
                      className="form-select"
                      value={formData.grauAutomatizacao}
                      onChange={(e) => handleInputChange('grauAutomatizacao', e.target.value)}
                    >
                      <option value="">Selecionar</option>
                      {automatizacaoOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="form-select-chevron" size={16} />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">
                    Grau de suporte analítico*
                    <button className="form-help-btn" title="Selecione o grau">
                      <HelpCircle size={14} />
                    </button>
                  </label>
                  <div className="form-select-wrapper">
                    <select
                      className="form-select"
                      value={formData.grauSuporteAnalitico}
                      onChange={(e) => handleInputChange('grauSuporteAnalitico', e.target.value)}
                    >
                      <option value="">Selecionar</option>
                      {suporteAnaliticoOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="form-select-chevron" size={16} />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">
                    Natureza de execução do processo*
                    <button className="form-help-btn" title="Selecione a natureza">
                      <HelpCircle size={14} />
                    </button>
                  </label>
                  <div className="form-select-wrapper">
                    <select
                      className="form-select"
                      value={formData.naturezaExecucao}
                      onChange={(e) => handleInputChange('naturezaExecucao', e.target.value)}
                    >
                      <option value="">Selecionar</option>
                      {naturezaExecucaoOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="form-select-chevron" size={16} />
                  </div>
                </div>
              </div>

              <div className="form-checkbox-wrapper">
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={formData.ligadoMWB}
                    onChange={(e) => handleInputChange('ligadoMWB', e.target.checked)}
                  />
                  <span className="form-checkbox-custom"></span>
                  O processo está diretamente ligado a uma MWB?
                </label>
              </div>

              <div className="form-alert form-alert--info">
                <Info size={16} />
                <span>Caso o processo esteja diretamente ligado a uma Must-Win-Battle, ele será considerado um processo crítico</span>
              </div>
            </section>
          </>
        );

      default:
        return (
          <div className="form-placeholder">
            <p>Esta seção está em desenvolvimento.</p>
          </div>
        );
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
            <span>Processos</span>
            <ChevronRight size={16} />
            <span className="processo-form-breadcrumb-current">Novo processo</span>
          </nav>
        </div>
        <div className="processo-form-title-section">
          <span className="processo-form-code">{formData.codigo}</span>
          <h1 className="processo-form-title">Novo processo</h1>
        </div>
      </header>

      {/* Main content */}
      <div className="processo-form-content">
        {/* Sidebar tabs */}
        <aside className="processo-form-sidebar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`processo-form-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Form content */}
        <main className="processo-form-main">
          <h2 className="processo-form-section-header">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          {renderTabContent()}
        </main>
      </div>

      {/* Footer */}
      <footer className="processo-form-footer">
        <button className="processo-form-btn processo-form-btn--secondary" onClick={onBack}>
          Cancelar
        </button>
        <button className="processo-form-btn processo-form-btn--primary" onClick={handleSubmit}>
          Prosseguir
        </button>
      </footer>
    </div>
  );
}
