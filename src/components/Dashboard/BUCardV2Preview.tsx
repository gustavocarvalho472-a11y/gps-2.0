/**
 * GPS 2.0 - BUCardV2 Preview Page
 * Página isolada para testar o novo design do card antes de integrar
 */

import { useState } from 'react';
import { BUCardV2 } from './BUCard';
import { businessUnits, getVPById } from '../../data/organizationData';
import type { DetailType } from '../../types';

export function BUCardV2Preview() {
  const [expandedBU, setExpandedBU] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string>('');

  // Pega apenas 2 BUs para teste
  const testBUs = businessUnits.slice(0, 2);

  const handleShowDetails = (type: DetailType, data: any, breadcrumb: { type: DetailType; nome: string }[]) => {
    setLastAction(`Detalhes: ${type} - ${data.nome || data.codigo}`);
    console.log('ShowDetails:', { type, data, breadcrumb });
  };

  return (
    <div style={{
      padding: '2rem',
      background: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          marginBottom: '2rem',
          padding: '1rem',
          background: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffc107'
        }}>
          <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', color: '#856404' }}>
            Preview: BUCardV2
          </h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#856404' }}>
            Esta é uma página de teste isolada. O componente original não foi alterado.
          </p>
        </div>

        {lastAction && (
          <div style={{
            marginBottom: '1rem',
            padding: '0.75rem 1rem',
            background: '#d4edda',
            borderRadius: '6px',
            fontSize: '0.875rem',
            color: '#155724'
          }}>
            Última ação: {lastAction}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {testBUs.map(bu => (
            <BUCardV2
              key={bu.id}
              bu={bu}
              vp={getVPById(bu.vpId)}
              isExpanded={expandedBU === bu.id}
              onToggle={() => setExpandedBU(expandedBU === bu.id ? null : bu.id)}
              onShowDetails={handleShowDetails}
            />
          ))}
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'white',
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#666' }}>
            Instruções de Teste:
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: '#666' }}>
            <li>Clique no card para expandir/colapsar o dropdown</li>
            <li>Clique nas setas para navegar na hierarquia</li>
            <li>Clique no botão "Detalhes" ou nos ícones de olho para ver ações</li>
            <li>Verifique o VP badge no canto superior direito</li>
            <li>Verifique as 4 métricas coloridas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
