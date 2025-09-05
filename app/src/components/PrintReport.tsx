import { useEffect, useMemo } from 'react';

type Linha = Record<string, string|number>;

export default function PrintReport(){
  const search = new URLSearchParams(location.search);
  const dadosParam = search.get('dados') || '[]';
  const periodo = search.get('periodo') || '';

  const dados: Linha[] = useMemo(()=>{
    try { return JSON.parse(decodeURIComponent(dadosParam)); }
    catch { return []; }
  }, [dadosParam]);

  useEffect(()=>{ document.title = 'Relatório de Designações'; }, []);

  const keys = Object.keys(dados[0] || {});
  return (
    <div style={{fontFamily:'Arial, sans-serif', margin:40}}>
      <h1 style={{textAlign:'center'}}>Relatório de Designações</h1>
      <h2 style={{textAlign:'center'}}>Período: {periodo}</h2>
      <table style={{width:'100%', borderCollapse:'collapse', marginTop:30}}>
        <thead>
          <tr>
            {keys.map(k=>(
              <th key={k} style={{border:'1px solid #333', padding:8, background:'#007BFF', color:'#fff', textAlign:'center'}}>
                {k.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((row, i)=>(
            <tr key={i} style={{background: i%2 ? '#f9f9f9' : 'transparent'}}>
              {keys.map(k=>(
                <td key={k} style={{border:'1px solid #333', padding:8, textAlign:'center'}}>
                  {String(row[k] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
