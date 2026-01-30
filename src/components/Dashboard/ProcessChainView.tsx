/**
 * GPS 2.0 - Process Chain View
 * Visualização da cadeia de processos com inputs/outputs
 */

import type { Macroprocesso, Processo } from '../../types';
import { Badge } from '@/components/ui/badge';
import './ProcessChainView.css';

interface ProcessChainViewProps {
  macroprocesso: Macroprocesso;
}

// Mock de dados de conexão (em produção viria do backend)
const getProcessConnections = (processos: Processo[]) => {
  // Gera conexões fictícias baseadas na ordem dos processos
  return processos.map((p, index) => ({
    ...p,
    inputs: index === 0
      ? ['Dados de entrada', 'Solicitação inicial']
      : [`Output de ${processos[index - 1]?.codigo || 'anterior'}`],
    outputs: index === processos.length - 1
      ? ['Entrega final', 'Relatório consolidado']
      : [`Input para ${processos[index + 1]?.codigo || 'próximo'}`],
    dono: getMockDono(index),
  }));
};

const getMockDono = (index: number) => {
  const donos = [
    { nome: 'Carlos Silva', iniciais: 'CS' },
    { nome: 'Ana Lima', iniciais: 'AL' },
    { nome: 'Pedro Oliveira', iniciais: 'PO' },
    { nome: 'Márcia Ferreira', iniciais: 'MF' },
    { nome: 'João Rocha', iniciais: 'JR' },
  ];
  return donos[index % donos.length];
};

export function ProcessChainView({ macroprocesso }: ProcessChainViewProps) {
  const processosComConexoes = getProcessConnections(macroprocesso.processos);

  // Divide em paralelos se tiver mais de 3 processos
  const hasParallel = processosComConexoes.length >= 4;

  let fluxoPrincipal: typeof processosComConexoes = [];
  let fluxoParalelo: typeof processosComConexoes = [];

  if (hasParallel && processosComConexoes.length >= 5) {
    // P1 -> P2/P3 (paralelo) -> P4 -> P5
    fluxoPrincipal = [
      processosComConexoes[0],
      processosComConexoes[1],
      processosComConexoes[3],
      processosComConexoes[4],
    ];
    fluxoParalelo = [processosComConexoes[2]];
  } else {
    fluxoPrincipal = processosComConexoes;
  }

  return (
    <div className="chain-view">
      {/* Header do Macroprocesso */}
      <div className="chain-header">
        <div className="chain-header-info">
          <Badge variant="secondary" className="chain-badge">
            {macroprocesso.codigo}
          </Badge>
          <h2 className="chain-title">{macroprocesso.nome}</h2>
        </div>
        <div className="chain-stats">
          <span className="chain-stat">{macroprocesso.processos.length} processos</span>
        </div>
      </div>

      {/* Fluxo de Processos */}
      <div className="chain-flow">
        {hasParallel && processosComConexoes.length >= 5 ? (
          // Layout com paralelo
          <div className="chain-with-parallel">
            {/* P1 */}
            <ProcessCard processo={fluxoPrincipal[0]} index={0} />

            <div className="chain-arrow">
              <div className="arrow-line" />
              <span className="arrow-label">{fluxoPrincipal[0].outputs[0]}</span>
            </div>

            {/* P2 e P3 em paralelo */}
            <div className="parallel-container">
              <div className="parallel-branch">
                <ProcessCard processo={fluxoPrincipal[1]} index={1} />
                <div className="chain-arrow">
                  <div className="arrow-line" />
                  <span className="arrow-label">{fluxoPrincipal[1].outputs[0]}</span>
                </div>
              </div>
              <div className="parallel-branch">
                <ProcessCard processo={fluxoParalelo[0]} index={2} />
                <div className="chain-arrow">
                  <div className="arrow-line" />
                  <span className="arrow-label">{fluxoParalelo[0].outputs[0]}</span>
                </div>
              </div>
            </div>

            {/* P4 */}
            <ProcessCard processo={fluxoPrincipal[2]} index={3} />

            <div className="chain-arrow">
              <div className="arrow-line" />
              <span className="arrow-label">{fluxoPrincipal[2].outputs[0]}</span>
            </div>

            {/* P5 */}
            <ProcessCard processo={fluxoPrincipal[3]} index={4} />
          </div>
        ) : (
          // Layout linear
          <div className="chain-linear">
            {processosComConexoes.map((processo, index) => (
              <div key={processo.id} className="chain-item">
                <ProcessCard processo={processo} index={index} />
                {index < processosComConexoes.length - 1 && (
                  <div className="chain-arrow">
                    <div className="arrow-line" />
                    <span className="arrow-label">{processo.outputs[0]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legenda */}
      <div className="chain-legend">
        <div className="legend-item">
          <span className="legend-dot input" />
          <span>Input</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot output" />
          <span>Output</span>
        </div>
        <div className="legend-item">
          <span className="legend-line" />
          <span>Fluxo de dados</span>
        </div>
      </div>
    </div>
  );
}

interface ProcessCardProps {
  processo: Processo & { inputs: string[]; outputs: string[]; dono: { nome: string; iniciais: string } };
  index: number;
}

function ProcessCard({ processo, index }: ProcessCardProps) {
  return (
    <div className="process-card">
      <div className="process-number">{index + 1}</div>
      <div className="process-name">{processo.nome}</div>
      <div className="process-dono">
        <span className="dono-avatar">{processo.dono.iniciais}</span>
        <span className="dono-name">{processo.dono.nome}</span>
      </div>
      <div className="process-io">
        <div className="io-section">
          <span className="io-title">Inputs</span>
          <div className="io-list">
            {processo.inputs.map((input, i) => (
              <div key={i} className="io-item input">
                {input}
              </div>
            ))}
          </div>
        </div>
        <div className="io-section">
          <span className="io-title">Outputs</span>
          <div className="io-list">
            {processo.outputs.map((output, i) => (
              <div key={i} className="io-item output">
                {output}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="process-status">
        <Badge
          variant="outline"
          className={`status-badge status-${processo.status}`}
        >
          {processo.status === 'ativo' ? 'Ativo' : processo.status === 'em_revisao' ? 'Em Revisão' : 'Inativo'}
        </Badge>
        <span className="process-fte">{processo.fte} FTE</span>
      </div>
    </div>
  );
}
