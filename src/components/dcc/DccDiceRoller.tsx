import React, { useMemo, useState } from 'react';
import { rollDice } from '../../lib/dcc/dice';

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
        <section
            className={className}
            style={{
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '16px',
                padding: '1rem',
                backgroundColor: 'var(--ifm-background-surface-color)',
                boxShadow: 'var(--ifm-global-shadow-lw)',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h2>
                    <p style={{ margin: '0.35rem 0 0 0', color: 'var(--ifm-color-emphasis-700)' }}>
                        Sélectionne les dés puis lance ton jet.
                    </p>
                </div>

                <div
                    style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '999px',
                        backgroundColor: 'var(--ifm-color-emphasis-100)',
                        fontWeight: 700,
                    }}
                >
                    {currentFormula}
                </div>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '0.75rem',
                    marginTop: '1rem',
                }}
            >
                <label style={{ display: 'grid', gap: '0.35rem' }}>
                    <span>Nombre de dés</span>
                    <select
                        value={count}
                        onChange={(event) => setCount(Number(event.target.value))}
                        style={{
                            borderRadius: '10px',
                            border: '1px solid var(--ifm-color-emphasis-300)',
                            padding: '0.65rem 0.8rem',
                            backgroundColor: 'var(--ifm-background-color)',
                            color: 'var(--ifm-font-color-base)',
                        }}
                    >
                        {COUNT_OPTIONS.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </label>

                <label style={{ display: 'grid', gap: '0.35rem' }}>
                    <span>Type de dé</span>
                    <select
                        value={sides}
                        onChange={(event) => setSides(Number(event.target.value))}
                        style={{
                            borderRadius: '10px',
                            border: '1px solid var(--ifm-color-emphasis-300)',
                            padding: '0.65rem 0.8rem',
                            backgroundColor: 'var(--ifm-background-color)',
                            color: 'var(--ifm-font-color-base)',
                        }}
                    >
                        {DICE_OPTIONS.map((value) => (
                            <option key={value} value={value}>
                                d{value}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <button
                    type="button"
                    className="button button--primary"
                    onClick={handleRoll}
                >
                    Lancer {currentFormula}
                </button>

                {result ? (
                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={() => setResult(null)}
                    >
                        Effacer le résultat
                    </button>
                ) : null}
            </div>

            {result ? (
                <div
                    style={{
                        marginTop: '1rem',
                        borderTop: '1px solid var(--ifm-color-emphasis-200)',
                        paddingTop: '1rem',
                        display: 'grid',
                        gap: '0.75rem',
                    }}
                >
                    <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)' }}>
                            Dernier jet à {result.rolledAt}
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.25rem' }}>
                            {result.count}d{result.sides} → {result.total}
                        </div>
                    </div>

                    <div>
                        <strong>Détail :</strong>{' '}
                        {result.results.join(' + ')}
                        {result.results.length > 1 ? ` = ${result.total}` : ''}
                    </div>
                </div>
            ) : null}
        </section>
    );
}