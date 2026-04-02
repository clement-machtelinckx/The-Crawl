import React, { useMemo, useState } from 'react';
import { rollDice } from '../../lib/dcc/dice';
import { Button, SelectInput, Card } from '../ui';
import clsx from 'clsx';

type DiceResult = {
    count: number;
    sides: number;
    results: number[];
    total: number;
    rolledAt: string;
};

type DccDiceRollerProps = {
    title?: string;
    defaultCount?: number;
    defaultSides?: number;
    className?: string;
};

const DICE_OPTIONS = [4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 30] as const;
const COUNT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export default function DccDiceRoller({
    title = 'Lanceur de dés',
    defaultCount = 1,
    defaultSides = 20,
    className,
}: DccDiceRollerProps) {
    const [count, setCount] = useState<number>(defaultCount);
    const [sides, setSides] = useState<number>(defaultSides);
    const [result, setResult] = useState<DiceResult | null>(null);

    const currentFormula = useMemo(() => `${count}d${sides}`, [count, sides]);

    function handleRoll(): void {
        const roll = rollDice(count, sides);

        setResult({
            count,
            sides,
            results: roll.results,
            total: roll.total,
            rolledAt: new Date().toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
        });
    }

    return (
        <Card className={clsx("app-stack", className)}>
            <div className="app-row-between">
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h2>
                    <p className="app-muted" style={{ margin: '0.35rem 0 0 0' }}>
                        Sélectionne les dés puis lance ton jet.
                    </p>
                </div>

                <div
                    style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '999px',
                        backgroundColor: 'var(--app-surface-accent)',
                        border: '1px solid var(--app-border-color)',
                        fontWeight: 700,
                        fontSize: '0.9rem'
                    }}
                >
                    {currentFormula}
                </div>
            </div>

            <div className="app-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                <SelectInput
                    label="Nombre de dés"
                    value={count}
                    onChange={(event) => setCount(Number(event.target.value))}
                >
                    {COUNT_OPTIONS.map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </SelectInput>

                <SelectInput
                    label="Type de dé"
                    value={sides}
                    onChange={(event) => setSides(Number(event.target.value))}
                >
                    {DICE_OPTIONS.map((value) => (
                        <option key={value} value={value}>
                            d{value}
                        </option>
                    ))}
                </SelectInput>
            </div>

            <div className="app-row">
                <Button
                    variant="primary"
                    onClick={handleRoll}
                >
                    Lancer {currentFormula}
                </Button>

                {result && (
                    <Button
                        variant="secondary"
                        onClick={() => setResult(null)}
                    >
                        Effacer
                    </Button>
                )}
            </div>

            {result && (
                <div
                    style={{
                        marginTop: '0.5rem',
                        borderTop: '1px solid var(--app-border-color)',
                        paddingTop: '1rem',
                    }}
                    className="app-stack"
                >
                    <div>
                        <div className="app-text-small app-muted">
                            Dernier jet à {result.rolledAt}
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--ifm-color-primary)' }}>
                            {result.count}d{result.sides} → {result.total}
                        </div>
                    </div>

                    <div className="app-text-small">
                        <strong>Détail :</strong>{' '}
                        <span className="app-muted">
                            {result.results.join(' + ')}
                            {result.results.length > 1 ? ` = ${result.total}` : ''}
                        </span>
                    </div>
                </div>
            )}
        </Card>
    );
}
