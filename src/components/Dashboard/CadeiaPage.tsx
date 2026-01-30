/**
 * GPS 2.0 - Página de Cadeia de Processos
 * Visualização fullscreen da cadeia de processos de um macroprocesso
 */

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Macroprocesso } from '../../types';
import { ProcessChainView } from './ProcessChainView';

interface CadeiaPageProps {
  macroprocesso: Macroprocesso;
  onBack: () => void;
}

export function CadeiaPage({ macroprocesso, onBack }: CadeiaPageProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-xl font-semibold">
            Cadeia de Processos - {macroprocesso.codigo} {macroprocesso.nome}
          </h1>
          <p className="text-sm text-muted-foreground">
            {macroprocesso.processos.length} processos nesta cadeia
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-auto">
        <ProcessChainView macroprocesso={macroprocesso} />
      </div>
    </div>
  );
}
