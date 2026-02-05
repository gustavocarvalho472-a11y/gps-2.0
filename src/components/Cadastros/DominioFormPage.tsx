/**
 * GPS 2.0 - Domínio Form Page (Cadastros)
 * Página de cadastro/edição de domínio
 */

import { useState } from 'react';
import { ArrowLeft, ChevronRight, ChevronDown, Route, Search, HelpCircle, Building2, Users } from 'lucide-react';
import './ProcessoFormPage.css';

interface DominioFormData {
  // Hierarquia
  businessUnit: string;
  vp: string;
  // Dados do domínio
  codigo: string;
  nome: string;
  descricao: string;
  responsavel: string;
  // Características
  tipo: string;
  prioridade: string;
  status: string;
}

interface DominioFormPageProps {
  onBack: () => void;
  onSubmit?: (data: DominioFormData) => void;
}

// Mock data for dropdowns
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

const tipoOptions = [
  { value: 'estrategico', label: 'Estratégico' },
  { value: 'core', label: 'Core' },
  { value: 'suporte', label: 'Suporte' },
  { value: 'gestao', label: 'Gestão' },
];

const prioridadeOptions = [
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' },
];

const statusOptions = [
  { value: 'ativo', label: 'Ativo' },
  { value: 'em_revisao', label: 'Em Revisão' },
  { value: 'inativo', label: 'Inativo' },
];

export function DominioFormPage({ onBack, onSubmit }: DominioFormPageProps) {
  const [formData, setFormData] = useState<DominioFormData>({
    businessUnit: '',
    vp: '',
    codigo: 'DOM006',
    nome: '',
    descricao: '',
    responsavel: '',
    tipo: '',
    prioridade: '',
    status: 'ativo',
  });

  const handleInputChange = (field: keyof DominioFormData, value: string) => {
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
            <span>Domínios</span>
            <ChevronRight size={16} />
            <span className="processo-form-breadcrumb-current">Novo domínio</span>
          </nav>
        </div>
        <div className="processo-form-title-section">
          <span className="processo-form-code">{formData.codigo}</span>
          <h1 className="processo-form-title">Novo domínio</h1>
        </div>
      </header>

      {/* Main content - sem sidebar para formulário simples */}
      <div className="processo-form-content">
        <main className="processo-form-main" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="processo-form-section-header">Informações do Domínio</h2>

          {/* Hierarquia */}
          <section className="form-section">
            <h3 className="form-section-title">
              <Route size={18} style={{ marginRight: '0.5rem', color: 'var(--color-primary-40)' }} />
              Hierarquia
            </h3>

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
                  <button className="form-help-btn" title="Selecione o VP responsável">
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

          {/* Dados do Domínio */}
          <section className="form-section">
            <h3 className="form-section-title">Dados do Domínio</h3>

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
                  Nome do Domínio*
                  <button className="form-help-btn" title="Informe o nome do domínio">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex.: Gestão de Pessoas"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Descrição do Domínio</label>
              <textarea
                className="form-textarea"
                placeholder="Descreva o objetivo e escopo deste domínio..."
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                maxLength={500}
              />
              <span className="form-char-count">{formData.descricao.length}/500</span>
            </div>

            <div className="form-field">
              <label className="form-label">
                Responsável*
                <button className="form-help-btn" title="Selecione o responsável pelo domínio">
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
            <h3 className="form-section-title">Características</h3>

            <div className="form-row form-row--3">
              <div className="form-field">
                <label className="form-label">
                  Tipo de Domínio*
                  <button className="form-help-btn" title="Classifique o tipo do domínio">
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
                    {tipoOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="form-select-chevron" size={16} />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Prioridade*
                  <button className="form-help-btn" title="Defina a prioridade">
                    <HelpCircle size={14} />
                  </button>
                </label>
                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={formData.prioridade}
                    onChange={(e) => handleInputChange('prioridade', e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    {prioridadeOptions.map(opt => (
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
          Salvar Domínio
        </button>
      </footer>
    </div>
  );
}
