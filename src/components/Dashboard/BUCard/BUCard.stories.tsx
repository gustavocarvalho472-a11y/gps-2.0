import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { BUCard } from './BUCard';
import type { BusinessUnit } from '../../../types';

// Mock data para as stories
const mockBU: BusinessUnit = {
  id: 'bu-1',
  codigo: 'SOMOS',
  nome: 'SOMOS Educação',
  categoria: 'alianca',
  cor: '#7C3AED',
  vpId: 'vp-2',
  responsavel: {
    id: 'r-bu-1',
    nome: 'Maria Silva',
    cargo: 'Diretora de Operações',
  },
  dominios: [
    {
      id: 'd1',
      codigo: 'D01',
      nome: 'Gestão Escolar',
      responsavel: { id: 'r-1', nome: 'Ana Santos', cargo: 'Gerente de Domínio' },
      jornadas: [
        {
          id: 'j1',
          codigo: 'J01',
          nome: 'Matrícula',
          responsavel: { id: 'r-2', nome: 'Carlos Silva', cargo: 'Líder de Jornada' },
          macroprocessos: [
            {
              id: 'm1',
              codigo: 'M01',
              nome: 'Captação de Alunos',
              responsavel: { id: 'r-3', nome: 'Pedro Lima', cargo: 'Dono de Processo' },
              processos: [
                { id: 'p1', codigo: 'P001', nome: 'Prospecção', status: 'ativo' },
                { id: 'p2', codigo: 'P002', nome: 'Qualificação', status: 'ativo' },
                { id: 'p3', codigo: 'P003', nome: 'Conversão', status: 'em_revisao' },
              ],
              totalProcessos: 3,
            },
            {
              id: 'm2',
              codigo: 'M02',
              nome: 'Formalização',
              responsavel: { id: 'r-4', nome: 'Julia Costa', cargo: 'Dono de Processo' },
              processos: [
                { id: 'p4', codigo: 'P004', nome: 'Documentação', status: 'ativo' },
                { id: 'p5', codigo: 'P005', nome: 'Contrato', status: 'ativo' },
              ],
              totalProcessos: 2,
            },
          ],
          totalMacroprocessos: 2,
          totalProcessos: 5,
        },
        {
          id: 'j2',
          codigo: 'J02',
          nome: 'Rematrícula',
          responsavel: { id: 'r-5', nome: 'Marcos Oliveira', cargo: 'Líder de Jornada' },
          macroprocessos: [
            {
              id: 'm3',
              codigo: 'M03',
              nome: 'Renovação',
              responsavel: { id: 'r-6', nome: 'Fernanda Lima', cargo: 'Dono de Processo' },
              processos: [
                { id: 'p6', codigo: 'P006', nome: 'Aviso de Renovação', status: 'ativo' },
                { id: 'p7', codigo: 'P007', nome: 'Confirmação', status: 'ativo' },
              ],
              totalProcessos: 2,
            },
          ],
          totalMacroprocessos: 1,
          totalProcessos: 2,
        },
        {
          id: 'j3',
          codigo: 'J03',
          nome: 'Transferência',
          responsavel: { id: 'r-7', nome: 'Roberto Dias', cargo: 'Líder de Jornada' },
          macroprocessos: [
            {
              id: 'm4',
              codigo: 'M04',
              nome: 'Análise de Transferência',
              responsavel: { id: 'r-8', nome: 'Camila Santos', cargo: 'Dono de Processo' },
              processos: [
                { id: 'p8', codigo: 'P008', nome: 'Solicitação', status: 'ativo' },
                { id: 'p9', codigo: 'P009', nome: 'Validação', status: 'em_revisao' },
                { id: 'p10', codigo: 'P010', nome: 'Efetivação', status: 'inativo' },
              ],
              totalProcessos: 3,
            },
          ],
          totalMacroprocessos: 1,
          totalProcessos: 3,
        },
      ],
      totalJornadas: 3,
      totalMacroprocessos: 4,
      totalProcessos: 10,
    },
    {
      id: 'd2',
      codigo: 'D02',
      nome: 'Conteúdo Didático',
      responsavel: { id: 'r-9', nome: 'Ricardo Torres', cargo: 'Gerente de Domínio' },
      jornadas: [
        {
          id: 'j4',
          codigo: 'J04',
          nome: 'Criação de Conteúdo',
          responsavel: { id: 'r-10', nome: 'Patrícia Mendes', cargo: 'Líder de Jornada' },
          macroprocessos: [
            {
              id: 'm5',
              codigo: 'M05',
              nome: 'Produção Editorial',
              responsavel: { id: 'r-11', nome: 'Bruno Carvalho', cargo: 'Dono de Processo' },
              processos: [
                { id: 'p11', codigo: 'P011', nome: 'Briefing', status: 'ativo' },
                { id: 'p12', codigo: 'P012', nome: 'Redação', status: 'ativo' },
                { id: 'p13', codigo: 'P013', nome: 'Revisão', status: 'ativo' },
                { id: 'p14', codigo: 'P014', nome: 'Diagramação', status: 'ativo' },
              ],
              totalProcessos: 4,
            },
          ],
          totalMacroprocessos: 1,
          totalProcessos: 4,
        },
      ],
      totalJornadas: 1,
      totalMacroprocessos: 1,
      totalProcessos: 4,
    },
    {
      id: 'd3',
      codigo: 'D03',
      nome: 'Plataforma Digital',
      responsavel: { id: 'r-12', nome: 'Amanda Ribeiro', cargo: 'Gerente de Domínio' },
      jornadas: [
        {
          id: 'j5',
          codigo: 'J05',
          nome: 'Experiência do Usuário',
          responsavel: { id: 'r-13', nome: 'Gustavo Melo', cargo: 'Líder de Jornada' },
          macroprocessos: [
            {
              id: 'm6',
              codigo: 'M06',
              nome: 'Onboarding Digital',
              responsavel: { id: 'r-14', nome: 'Letícia Rocha', cargo: 'Dono de Processo' },
              processos: [
                { id: 'p15', codigo: 'P015', nome: 'Primeiro Acesso', status: 'ativo' },
                { id: 'p16', codigo: 'P016', nome: 'Tutorial', status: 'ativo' },
                { id: 'p17', codigo: 'P017', nome: 'Configuração', status: 'ativo' },
              ],
              totalProcessos: 3,
            },
          ],
          totalMacroprocessos: 1,
          totalProcessos: 3,
        },
      ],
      totalJornadas: 1,
      totalMacroprocessos: 1,
      totalProcessos: 3,
    },
  ],
  totalDominios: 3,
  totalJornadas: 5,
  totalMacroprocessos: 6,
  totalProcessos: 17,
};

const meta: Meta<typeof BUCard> = {
  title: 'Dashboard/BUCard',
  component: BUCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Card expansível para Business Unit com dropdown cascateado mostrando Domínios, Jornadas, Macroprocessos e Processos.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isExpanded: {
      control: 'boolean',
      description: 'Controla se o dropdown está expandido',
    },
    bu: {
      control: 'object',
      description: 'Dados da Business Unit',
    },
  },
  args: {
    onToggle: fn(),
    onShowDetails: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Estado padrão do card - colapsado
 */
export const Collapsed: Story = {
  args: {
    bu: mockBU,
    isExpanded: false,
  },
};

/**
 * Card expandido mostrando o dropdown com domínios
 */
export const Expanded: Story = {
  args: {
    bu: mockBU,
    isExpanded: true,
  },
};

/**
 * Card com cor diferente (cor da BU)
 */
export const DifferentColor: Story = {
  args: {
    bu: {
      ...mockBU,
      codigo: 'KROTON',
      nome: 'Kroton Educacional',
      cor: '#EC4899',
    },
    isExpanded: false,
  },
};

/**
 * Card com muitos domínios
 */
export const ManyDomains: Story = {
  args: {
    bu: {
      ...mockBU,
      totalDominios: 8,
      totalProcessos: 450,
    },
    isExpanded: false,
  },
};
