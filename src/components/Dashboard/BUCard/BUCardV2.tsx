/**
 * GPS 2.0 - BU Card V2
 * Design inspirado no shadcn/ui - limpo, minimalista, hierarquia clara
 */

import { useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink, Layers, GitBranch, Boxes, FileText } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { BusinessUnit, VP, DetailType } from '../../../types';

export interface BUCardV2Props {
  bu: BusinessUnit;
  vp?: VP;
  isExpanded: boolean;
  onToggle: () => void;
  onShowDetails: (type: DetailType, data: any, breadcrumb: { type: DetailType; nome: string }[]) => void;
}

export function BUCardV2({ bu, vp, isExpanded, onToggle, onShowDetails }: BUCardV2Props) {
  const [expandedDominio, setExpandedDominio] = useState<string | null>(null);
  const [expandedJornada, setExpandedJornada] = useState<string | null>(null);
  const [expandedMacro, setExpandedMacro] = useState<string | null>(null);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      {/* Card Header */}
      <div
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        {/* Color Accent */}
        <div
          className="w-1 h-12 rounded-full shrink-0"
          style={{ backgroundColor: bu.cor }}
        />

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground">{bu.codigo}</span>
            {vp && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="text-muted-foreground/50">•</span>
                <Avatar className="h-4 w-4">
                  <AvatarImage src={vp.foto} />
                  <AvatarFallback className="text-[8px]" style={{ backgroundColor: vp.cor }}>
                    {vp.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate max-w-[120px]">{vp.nome}</span>
              </div>
            )}
          </div>
          <h3 className="font-semibold truncate">{bu.nome}</h3>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Layers className="h-4 w-4" />
            <span className="font-medium text-foreground">{bu.totalDominios}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            <span className="font-medium text-foreground">{bu.totalProcessos}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
            onClick={(e) => {
              e.stopPropagation();
              onShowDetails('bu', bu, [{ type: 'bu', nome: bu.nome }]);
            }}
          >
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-1">Ver</span>
          </Button>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t">
          {/* Domínios */}
          {bu.dominios.map((dominio, dominioIndex) => (
            <div key={dominio.id} className={cn(dominioIndex > 0 && "border-t")}>
              {/* Domínio Header */}
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors",
                  "hover:bg-muted/50",
                  expandedDominio === dominio.id && "bg-muted/30"
                )}
                onClick={() => setExpandedDominio(expandedDominio === dominio.id ? null : dominio.id)}
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    expandedDominio === dominio.id && "rotate-90"
                  )}
                />
                <Layers className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-mono text-muted-foreground w-8">{dominio.codigo}</span>
                <span className="flex-1 text-sm font-medium truncate">{dominio.nome}</span>
                <span className="text-xs text-muted-foreground">{dominio.totalProcessos} processos</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowDetails('dominio', dominio, [
                      { type: 'bu', nome: bu.nome },
                      { type: 'dominio', nome: dominio.nome }
                    ]);
                  }}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Jornadas */}
              {expandedDominio === dominio.id && (
                <div className="bg-muted/20">
                  {dominio.jornadas.map((jornada, jornadaIndex) => (
                    <div key={jornada.id} className={cn(jornadaIndex > 0 && "border-t border-border/50")}>
                      {/* Jornada Header */}
                      <div
                        className={cn(
                          "flex items-center gap-3 pl-8 pr-4 py-2.5 cursor-pointer transition-colors",
                          "hover:bg-muted/50",
                          expandedJornada === jornada.id && "bg-muted/40"
                        )}
                        onClick={() => setExpandedJornada(expandedJornada === jornada.id ? null : jornada.id)}
                      >
                        <ChevronRight
                          className={cn(
                            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                            expandedJornada === jornada.id && "rotate-90"
                          )}
                        />
                        <GitBranch className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground w-8">{jornada.codigo}</span>
                        <span className="flex-1 text-sm truncate">{jornada.nome}</span>
                        <span className="text-xs text-muted-foreground">{jornada.totalProcessos}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            onShowDetails('jornada', jornada, [
                              { type: 'bu', nome: bu.nome },
                              { type: 'dominio', nome: dominio.nome },
                              { type: 'jornada', nome: jornada.nome }
                            ]);
                          }}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Macroprocessos */}
                      {expandedJornada === jornada.id && (
                        <div className="bg-muted/30">
                          {jornada.macroprocessos.map((macro, macroIndex) => (
                            <div key={macro.id} className={cn(macroIndex > 0 && "border-t border-border/30")}>
                              {/* Macro Header */}
                              <div
                                className={cn(
                                  "flex items-center gap-3 pl-14 pr-4 py-2 cursor-pointer transition-colors",
                                  "hover:bg-muted/50",
                                  expandedMacro === macro.id && "bg-muted/50"
                                )}
                                onClick={() => setExpandedMacro(expandedMacro === macro.id ? null : macro.id)}
                              >
                                <ChevronRight
                                  className={cn(
                                    "h-3 w-3 text-muted-foreground transition-transform duration-200",
                                    expandedMacro === macro.id && "rotate-90"
                                  )}
                                />
                                <Boxes className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-xs font-mono text-muted-foreground w-8">{macro.codigo}</span>
                                <span className="flex-1 text-sm truncate">{macro.nome}</span>
                                <span className="text-xs text-muted-foreground">{macro.totalProcessos}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onShowDetails('macro', macro, [
                                      { type: 'bu', nome: bu.nome },
                                      { type: 'dominio', nome: dominio.nome },
                                      { type: 'jornada', nome: jornada.nome },
                                      { type: 'macro', nome: macro.nome }
                                    ]);
                                  }}
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>

                              {/* Processos */}
                              {expandedMacro === macro.id && (
                                <div className="bg-background border-t border-border/20">
                                  {macro.processos.map((processo, processoIndex) => (
                                    <div
                                      key={processo.id}
                                      className={cn(
                                        "flex items-center gap-3 pl-20 pr-4 py-2 text-sm",
                                        "hover:bg-muted/30 transition-colors",
                                        processoIndex > 0 && "border-t border-border/10"
                                      )}
                                    >
                                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                                      <span className="text-xs font-mono text-muted-foreground w-10">{processo.codigo}</span>
                                      <span className="flex-1 truncate">{processo.nome}</span>
                                      <span
                                        className={cn(
                                          "text-xs px-2 py-0.5 rounded-full font-medium",
                                          processo.status === 'ativo' && "bg-emerald-500/10 text-emerald-600",
                                          processo.status === 'em_revisao' && "bg-amber-500/10 text-amber-600",
                                          processo.status === 'inativo' && "bg-muted text-muted-foreground"
                                        )}
                                      >
                                        {processo.status === 'ativo' ? 'Ativo' : processo.status === 'em_revisao' ? 'Revisão' : 'Inativo'}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
