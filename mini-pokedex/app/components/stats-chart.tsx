'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StatsChartProps {
  stats: { base_stat: number; stat: { name: string } }[];
}

const STAT_COLORS: Record<string, string> = {
  hp: '#FF5959',
  attack: '#F5AC78',
  defense: '#FAE078',
  'special-attack': '#9DB7F5',
  'special-defense': '#A7DB8D',
  speed: '#FA92B2',
};

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export default function StatsChart({ stats }: StatsChartProps) {
  const chartData = stats.map(s => ({
    name: STAT_LABELS[s.stat.name] || s.stat.name,
    value: s.base_stat,
    fullName: s.stat.name,
  }));

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Base Stats</h2>
      
      {/* Tabla de stats */}
      <div className="space-y-2 mb-6">
        {stats.map(s => (
          <div key={s.stat.name} className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 w-24 capitalize">
              {STAT_LABELS[s.stat.name]}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{
                  width: `${Math.min((s.base_stat / 255) * 100, 100)}%`,
                  backgroundColor: STAT_COLORS[s.stat.name] || '#94a3b8',
                }}
              >
                <span className="text-xs font-bold text-white drop-shadow">
                  {s.base_stat}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico de barras */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis 
            domain={[0, 255]} 
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px'
            }}
            formatter={(value: number) => [value, 'Base Stat']}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={STAT_COLORS[entry.fullName] || '#94a3b8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Total: <span className="font-bold">{stats.reduce((sum, s) => sum + s.base_stat, 0)}</span>
        </p>
      </div>
    </div>
  );
}