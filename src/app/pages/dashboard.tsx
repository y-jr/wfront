import { useEffect, useState } from 'react';
import { getDashboardData } from '../../services/protected';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch(() => alert('Acesso não autorizado ou token inválido'));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Carregando...'}
    </div>
  );
}
