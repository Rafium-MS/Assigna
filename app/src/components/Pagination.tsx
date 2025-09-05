type Props = { page:number; totalPages:number; onChange:(p:number)=>void };

export default function Pagination({page, totalPages, onChange}:Props){
  if (totalPages <= 1) return null;
  return (
    <div className="paginacao">
      {Array.from({length: totalPages}, (_,i)=>i+1).map(n=>(
        <button key={n} className={n===page ? 'ativo' : ''} onClick={()=>onChange(n)}>{n}</button>
      ))}
    </div>
  );
}
