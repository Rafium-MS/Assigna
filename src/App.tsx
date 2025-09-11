import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sidebar } from "./components/Sidebar";
import { useToast } from "./components/Toast";
import { useConfirm } from "./components/ConfirmDialog";
import { StatusBadge } from "./components/Badge";
import { Modal } from "./components/Modal";
// ---------- Types ----------
 type ID = string;
 type Territory = { id: ID; name: string; image?: string };
 type FieldExit = { id: ID; name: string; dayOfWeek: number; time: string };
 type Assignment = {
  id: ID;
  territoryId: ID;
 fieldExitId: ID;
 startDate: string; // ISO date (YYYY-MM-DD)
 endDate: string;   // ISO date (YYYY-MM-DD)
  returned?: boolean;
};
 type SuggestionRuleConfig = {
  avoidLastAssignments: number; // avoid repeating same territory within last N assignments
  defaultDurationDays: number; // default assignment length
  avoidMonthsPerExit: number; // avoid repeating same territory for an exit within X months
  recentWeight: number; // weight for recent usage penalty
  balanceWeight: number; // weight for exit load balancing
 };

 // ---------- Utilities ----------
 const uid = () => Math.random().toString(36).slice(2, 10);
 const weekdays = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
 const fmtDate = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString();
 const addDays = (iso: string, days: number) => {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0,10);
 };
 const nextDateForDay = (baseIso: string, day: number) => {
  const d = new Date(baseIso + 'T00:00:00');
  while (d.getDay() !== day) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0,10);
 };

 // ---------- Local Storage Hook ----------
 function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState] as const;
 }

 // ---------- Store ----------
function useStore() {
  const toast = useToast();
  const [territories, setTerritories] = useLocalStorage<Territory[]>("tm.territories", []);
  const [exits, setExits] = useLocalStorage<FieldExit[]>("tm.exits", []);
  const [assignments, setAssignments] = useLocalStorage<Assignment[]>("tm.assignments", []);
 const [rules, setRules] = useLocalStorage<SuggestionRuleConfig>("tm.rules", {
   avoidLastAssignments: 5,
   defaultDurationDays: 30,
   avoidMonthsPerExit: 6,
   recentWeight: 1,
   balanceWeight: 1
 });
  const [warningDays, setWarningDays] = useLocalStorage<number>("tm.warningDays", 2);

  // CRUD helpers
  const addTerritory = (t: Omit<Territory, 'id'>) => {
    setTerritories(prev => [{ id: uid(), ...t }, ...prev]);
    toast.success('Território salvo');
  };
  const delTerritory = (id: ID) => {
    setTerritories(prev => prev.filter(t => t.id !== id));
    setAssignments(prev => prev.filter(a => a.territoryId !== id));
    toast.success('Território removido');
  };
  const updateTerritory = (id: ID, t: Omit<Territory, 'id'>) => {
    setTerritories(prev => prev.map(x => (x.id === id ? { ...x, ...t } : x)));
    toast.success('Território atualizado');
  };

  const addExit = (e: Omit<FieldExit, 'id'>) => {
    setExits(prev => [{ id: uid(), ...e }, ...prev]);
    toast.success('Saída salva');
  };
  const delExit = (id: ID) => {
    setExits(prev => prev.filter(e => e.id !== id));
    setAssignments(prev => prev.filter(a => a.fieldExitId !== id));
    toast.success('Saída removida');
  };
  const updateExit = (id: ID, e: Omit<FieldExit, 'id'>) => {
    setExits(prev => prev.map(x => (x.id === id ? { ...x, ...e } : x)));
    toast.success('Saída atualizada');
  };

  const addAssignment = (a: Omit<Assignment,'id'>) => {
    setAssignments(prev => [{ id: uid(), returned:false, ...a }, ...prev]);
    toast.success('Designação salva');
  };
  const delAssignment = (id: ID) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
    toast.success('Designação removida');
  };
  const updateAssignment = (id: ID, a: Omit<Assignment,'id'>) => {
    setAssignments(prev => prev.map(x => (x.id === id ? { ...x, ...a } : x)));
    toast.success('Designação atualizada');
  };

  const clearAll = () => {
    setTerritories([]); setExits([]); setAssignments([]);
    toast.success('Dados limpos');
  };

  return { territories, exits, assignments, rules, setRules, warningDays, setWarningDays, addTerritory, delTerritory, updateTerritory, addExit, delExit, updateExit, addAssignment, delAssignment, updateAssignment, clearAll };
}

 // ---------- UI Primitives ----------
 const Card: React.FC<{ className?: string, title?: string, children?: React.ReactNode, actions?: React.ReactNode }>=({ className='', title, children, actions })=> (
  <div className={`rounded-2xl shadow p-4 bg-white/70 dark:bg-neutral-900/60 backdrop-blur border border-black/5 ${className}`}>
    <div className="flex items-center justify-between mb-3">
      {title ? <h2 className="text-lg font-semibold">{title}</h2> : <span />}
      <div className="flex gap-2">{actions}</div>
    </div>
    {children}
  </div>
 );

 const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 bg-white dark:bg-neutral-900 ${props.className||''}`} />
 );
 const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select {...props} className={`w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900 ${props.className||''}`} />
 );
 const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className='', ...props }) => (
  <button {...props} className={`rounded-xl px-3 py-2 shadow border hover:shadow-md active:scale-[.98] transition ${className}`} />
 );
 const Label: React.FC<{children: React.ReactNode}> = ({children}) => (
  <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300">{children}</label>
 );

 // ---------- Image Picker ----------
const ImagePicker: React.FC<{ value?: string; onChange: (dataUrl?: string) => void; compress?: boolean }>=({ value, onChange, compress })=>{
  const handleFile = async (file?: File) => {
    if (!file) return onChange(undefined);
    if (compress) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      await new Promise(res => (img.onload = res));
      const canvas = document.createElement('canvas');
      const max = 600;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      onChange(canvas.toDataURL('image/jpeg', 0.8));
    } else {
      const reader = new FileReader();
      reader.onload = () => onChange(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex items-center gap-3">
      {value ? <img src={value} alt="preview" className="w-16 h-16 object-cover rounded-lg border"/> : <div className="w-16 h-16 rounded-lg border grid place-items-center text-xs text-neutral-500">sem imagem</div>}
      <div className="flex items-center gap-2">
        <input type="file" accept="image/*" onChange={e=>handleFile(e.target.files?.[0])} />
        {value && <Button onClick={()=>onChange(undefined)} className="bg-neutral-100 dark:bg-neutral-800">Remover</Button>}
      </div>
    </div>
  );
};

 // ---------- Context & Shell ----------
 type StoreCtx = ReturnType<typeof useStore>;
 const StoreContext = React.createContext<StoreCtx | null>(null);
 const useStoreContext = () => {
  const ctx = React.useContext(StoreContext);
  if(!ctx) throw new Error('StoreContext is missing');
  return ctx;
 };

function Shell({children, tab, setTab}:{children: React.ReactNode; tab:string; setTab:(t:string)=>void}){
 const [dark, setDark] = useState<boolean>(()=> window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
 useEffect(()=>{
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.classList.add('min-h-full');
    document.body.classList.add('bg-neutral-50','dark:bg-neutral-950');
  },[dark]);
  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100 flex">
      <Sidebar current={tab} onSelect={setTab} />
      <div className="flex-1">
        <header className="sticky top-0 z-10 backdrop-blur bg-white/60 dark:bg-neutral-950/50 border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="font-bold tracking-tight">Territory Manager</h1>
            <div className="flex items-center gap-2">
              <button onClick={()=>setDark(v=>!v)} className="rounded-xl px-3 py-2 border">{dark? '☀️ Claro':'🌙 Escuro'}</button>
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6 grid gap-4">{children}</main>
        <footer className="py-8 text-center text-xs text-neutral-500">Dados salvos localmente (localStorage).</footer>
      </div>
    </div>
  );
}
 // ---------- Helpers used by pages ----------
 const findName = (id: ID, list: {id:ID,name:string}[]) => list.find(x=>x.id===id)?.name || '—';

 // ---------- Pages ----------
 const TerritoriesPage: React.FC = () => {
  const { territories, addTerritory, delTerritory, updateTerritory } = useStoreContext();
  const confirm = useConfirm();

  const territorySchema = z.object({
    name: z.string().min(1, 'Nome obrigatório'),
    image: z.string().optional(),
  });
  type TerritoryForm = z.infer<typeof territorySchema>;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<TerritoryForm>({
    resolver: zodResolver(territorySchema),
    defaultValues: { name: '', image: undefined },
  });
  const [editingId, setEditingId] = useState<ID | null>(null);

  const onSubmit = (data: TerritoryForm) => {
    if (editingId) {
      updateTerritory(editingId, data);
    } else {
      addTerritory(data);
    }
    reset();
    setEditingId(null);
  };

  const startEdit = (t: Territory) => {
    setEditingId(t.id);
    reset({ name: t.name, image: t.image });
  };

  const [search, setSearch] = useState('');
  const [onlyWithImage, setOnlyWithImage] = useState(false);
  const filtered = territories.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) && (!onlyWithImage || t.image)
  );
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => { if (page > pageCount) setPage(pageCount); }, [page, pageCount]);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="grid gap-4">
      <Card title={editingId ? 'Editar Território' : 'Cadastrar Território'}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-3">
          <div className="grid gap-1">
            <Label>Nome</Label>
            <Input {...register('name')} placeholder="Ex.: Território 12 – Centro" />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div className="grid gap-1 md:col-span-2">
            <Label>Imagem (opcional)</Label>
            <ImagePicker value={watch('image')} onChange={v => setValue('image', v)} compress />
          </div>
          <div className="md:col-span-3 flex justify-end gap-2">
            {editingId && <Button type="button" onClick={() => { reset(); setEditingId(null); }} className="bg-neutral-100">Cancelar</Button>}
            <Button type="submit" className="bg-black text-white">{editingId ? 'Atualizar' : 'Salvar Território'}</Button>
          </div>
        </form>
      </Card>

      <Card title={`Territórios (${filtered.length})`} actions={
        <div className="flex gap-2 items-center">
          <Input placeholder="Buscar..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="max-w-xs" />
          <label className="flex items-center gap-1 text-sm"><input type="checkbox" checked={onlyWithImage} onChange={e => { setOnlyWithImage(e.target.checked); setPage(1); }} /> Com imagem</label>
        </div>
      }>
        {filtered.length === 0 ? (
          <p className="text-neutral-500">Nenhum território cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b"><th className="py-2">Nome</th><th>Imagem</th><th></th></tr>
              </thead>
              <tbody>
                {paginated.map(t => (
                  <tr key={t.id} className="border-b last:border-0">
                    <td className="py-2">{t.name}</td>
                    <td>{t.image ? <img src={t.image} alt={t.name} className="w-16 h-16 object-cover rounded-lg border" /> : '—'}</td>
                    <td className="py-2 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button onClick={() => startEdit(t)} className="bg-neutral-100">Editar</Button>
                        <Button onClick={async () => { if(await confirm('Excluir território?')) delTerritory(t.id); }} className="bg-red-50 text-red-700">Excluir</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-neutral-500">Página {page} de {pageCount}</span>
              <div className="flex gap-2">
                <Button type="button" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Anterior</Button>
                <Button type="button" disabled={page===pageCount} onClick={()=>setPage(p=>p+1)}>Próxima</Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
 };

 const ExitsPage: React.FC = () => {
  const { exits, addExit, delExit } = useStoreContext();
  const confirm = useConfirm();
  const [name, setName] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState<number>(6); // default Sábado
  const [time, setTime] = useState("09:00");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!name.trim()) return;
    addExit({ name: name.trim(), dayOfWeek, time });
    setName(""); setDayOfWeek(6); setTime("09:00");
  };
  return (
    <div className="grid gap-4">
      <Card title="Cadastrar Saída de Campo">
        <form onSubmit={submit} className="grid md:grid-cols-4 gap-3">
          <div className="grid gap-1">
            <Label>Nome</Label>
            <Input value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: Grupo Sábado Manhã" />
          </div>
          <div className="grid gap-1">
            <Label>Dia da Semana</Label>
            <select value={dayOfWeek} onChange={e=>setDayOfWeek(Number(e.target.value))} className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900">
              {weekdays.map((w,i)=> <option key={i} value={i}>{w}</option>)}
            </select>
          </div>
          <div className="grid gap-1">
            <Label>Horário</Label>
            <Input type="time" value={time} onChange={e=>setTime(e.target.value)} />
          </div>
          <div className="flex items-end justify-end">
            <Button type="submit" className="bg-black text-white">Salvar Saída</Button>
          </div>
        </form>
      </Card>

      <Card title={`Saídas (${exits.length})`}>
        {exits.length===0 ? <p className="text-neutral-500">Nenhuma saída cadastrada.</p> : (
          <div className="grid md:grid-cols-2 gap-3">
            {exits.map(e => (
              <div key={e.id} className="rounded-xl border p-3 flex items-center justify-between bg-white dark:bg-neutral-950">
                <div>
                  <p className="font-semibold">{e.name}</p>
                  <p className="text-sm text-neutral-600">{weekdays[e.dayOfWeek]} · {e.time}</p>
                </div>
                <Button onClick={async()=>{ if(await confirm('Excluir saída?')) delExit(e.id); }} className="bg-red-50 text-red-700">Excluir</Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
 }

 const AssignmentsPage: React.FC = () => {
  const { territories, exits, assignments, addAssignment, delAssignment, updateAssignment, rules } = useStoreContext();
  const confirm = useConfirm();
  const toast = useToast();
  const [territoryId, setTerritoryId] = useState<ID>("");
  const [exitId, setExitId] = useState<ID>("");
  const todayIso = new Date().toISOString().slice(0,10);
  const [startDate, setStartDate] = useState<string>(todayIso);
  const [endDate, setEndDate] = useState<string>(addDays(todayIso, rules.defaultDurationDays));

  const generateSuggestion = () => {
    const exit = exits.find(e => e.id === exitId);
    if (!exit) { toast.error('Selecione uma saída'); return; }
    const recent = new Set([...assignments]
      .sort((a,b)=> b.startDate.localeCompare(a.startDate))
      .slice(0, rules.avoidLastAssignments)
      .map(a => a.territoryId));
    const today = new Date(startDate + 'T00:00:00');
    const candidates = territories
      .filter(t => !recent.has(t.id))
      .flatMap(t => {
        const lastForExit = assignments
          .filter(a => a.territoryId === t.id && a.fieldExitId === exit.id)
          .map(a => new Date(a.startDate + 'T00:00:00'))
          .sort((a,b)=> b.getTime()-a.getTime())[0];
        if (lastForExit) {
          const months = (today.getTime()-lastForExit.getTime())/1000/60/60/24/30;
          if (months < rules.avoidMonthsPerExit) return [];
        }
        const lastOverall = getLastAssignmentDate(t.id, assignments);
        const days = lastOverall ? Math.floor((today.getTime()-lastOverall.getTime())/86400000) : Infinity;
        const recencyPenalty = lastOverall ? 1/(days+1) : 0;
        const score = -rules.recentWeight * recencyPenalty;
        return [{ territoryId: t.id, score }];
      })
      .sort((a,b)=> b.score - a.score);
    const chosen = candidates[0];
    if (!chosen) { toast.error('Sem territórios disponíveis'); return; }
    const s = nextDateForDay(startDate, exit.dayOfWeek);
    setTerritoryId(chosen.territoryId);
    setStartDate(s);
    setEndDate(addDays(s, rules.defaultDurationDays));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!territoryId || !exitId) { toast.error('Selecione território e saída'); return; }
    addAssignment({ territoryId, fieldExitId: exitId, startDate, endDate });
  };

  return (
    <div className="grid gap-4">
      <Card title="Nova Designação">
        <form onSubmit={submit} className="grid md:grid-cols-5 gap-3">
          <div className="grid gap-1">
            <Label>Território</Label>
            <select value={territoryId} onChange={e=>setTerritoryId(e.target.value)} className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900">
              <option value="">Selecione…</option>
              {territories.map(t=> <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="grid gap-1">
            <Label>Saída</Label>
            <select value={exitId} onChange={e=>setExitId(e.target.value)} className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900">
              <option value="">Selecione…</option>
              {exits.map(x=> <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
          </div>
          <div className="grid gap-1">
            <Label>Data Designação</Label>
            <Input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label>Data Devolução</Label>
            <Input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} />
          </div>
          <div className="flex items-end justify-end gap-2">
            <Button type="button" onClick={generateSuggestion} className="bg-blue-600 text-white">Gerar sugestão</Button>
            <Button type="submit" className="bg-black text-white">Salvar</Button>
          </div>
        </form>
      </Card>

      <Card title={`Designações (${assignments.length})`}>
        {assignments.length===0 ? <p className="text-neutral-500">Sem designações.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Território</th>
                  <th>Saída</th>
                  <th>Designação</th>
                  <th>Devolução</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(a => {
                  const status = a.returned ? 'devolvido' : (new Date(a.endDate) < new Date() ? 'atrasado' : 'ativo');
                  return (
                  <tr key={a.id} className="border-b last:border-0">
                    <td className="py-2">{findName(a.territoryId, territories)}</td>
                    <td>{findName(a.fieldExitId, exits)}</td>
                    <td>{fmtDate(a.startDate)}</td>
                    <td>{fmtDate(a.endDate)}</td>
                    <td><StatusBadge status={status as any} /></td>
                    <td className="text-right flex gap-2 justify-end">
                      <Button onClick={()=>updateAssignment(a.id, { ...a, returned: !a.returned })} className="bg-neutral-100">{a.returned ? 'Reativar' : 'Devolver'}</Button>
                      <Button onClick={async()=>{ if(await confirm('Excluir designação?')) delAssignment(a.id); }} className="bg-red-50 text-red-700">Excluir</Button>
                    </td>
                  </tr>
                );})}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

 const CalendarPage: React.FC = () => {
  const { assignments, territories, warningDays, setWarningDays } = useStoreContext();
  const [month, setMonth] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const today = new Date();
  const toIso = (d: Date) => d.toISOString().slice(0,10);

  const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const gridStart = new Date(startOfMonth);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }

  const open = (iso: string) => setSelectedDay(iso);
  const close = () => setSelectedDay(null);

  return (
    <div className="grid gap-4">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="bg-neutral-100">◀</Button>
            <h2 className="font-semibold">{month.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <Button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="bg-neutral-100">▶</Button>
          </div>
          <div className="flex items-center gap-2">
            <Label>Alerta (dias)</Label>
            <Input type="number" min={0} value={warningDays} onChange={e=>setWarningDays(Number(e.target.value)||0)} className="w-16" />
          </div>
        </div>

        <div className="grid grid-cols-7 text-sm font-medium text-center mb-1">
          {weekdays.map(w => <div key={w}>{w.slice(0,3)}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-px bg-neutral-200 rounded overflow-hidden">
          {days.map(d => {
            const iso = toIso(d);
            const inMonth = d.getMonth() === month.getMonth();
            const startItems = assignments.filter(a => a.startDate === iso);
            const dueToday = assignments.filter(a => a.endDate === iso && !a.returned);
            let cellCls = inMonth ? 'bg-white' : 'bg-neutral-50 text-neutral-400';
            const dueDiffs = dueToday.map(a => Math.ceil((new Date(a.endDate).getTime() - today.getTime())/86400000));
            if (dueDiffs.some(n => n < 0)) cellCls += ' bg-red-100';
            else if (dueDiffs.some(n => n <= warningDays)) cellCls += ' bg-yellow-100';
            return (
              <div key={iso} className={`min-h-24 p-1 cursor-pointer ${cellCls}`} onClick={() => open(iso)} onDragStart={() => open(iso)} draggable>
                <div className="text-xs text-right">{d.getDate()}</div>
                {startItems.map(a => {
                  const diff = Math.ceil((new Date(a.endDate).getTime() - today.getTime())/86400000);
                  let badge: React.ReactNode = null;
                  if (!a.returned) {
                    if (diff < 0) badge = <span className="ml-1 text-[10px] px-1 rounded bg-red-600 text-white">Atrasado</span>;
                    else if (diff <= warningDays) badge = <span className="ml-1 text-[10px] px-1 rounded bg-orange-500 text-white">D-{diff}</span>;
                  }
                  return (
                    <div key={a.id} className="text-[10px] truncate">
                      {findName(a.territoryId, territories)}{badge}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Card>

      {selectedDay && (
        <Modal>
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">{fmtDate(selectedDay)}</h3>
            {(() => {
              const items = assignments.filter(a => a.startDate === selectedDay || a.endDate === selectedDay);
              return items.length === 0 ? (
                <p className="text-sm text-neutral-500">Sem designações.</p>
              ) : (
                <ul className="text-sm grid gap-1">
                  {items.map(a => (
                    <li key={a.id}>{findName(a.territoryId, territories)} — {fmtDate(a.startDate)} → {fmtDate(a.endDate)}</li>
                  ))}
                </ul>
              );
            })()}
            <div className="text-right">
              <Button onClick={close} className="bg-neutral-100">Fechar</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
 };

// ---------- Suggestions Engine ----------
type Suggestion = { fieldExitId: ID; territoryId: ID; startDate: string; endDate: string };

 function getLastAssignmentDate(territoryId: ID, assignments: Assignment[]): Date | undefined {
  const arr = assignments
    .filter(a => a.territoryId === territoryId)
    .map(a => new Date(a.startDate + 'T00:00:00'))
    .sort((a,b)=> b.getTime()-a.getTime());
  return arr[0];
 }

const SuggestionsPage: React.FC = () => {
 const { territories, exits, assignments, rules, setRules, addAssignment } = useStoreContext();
 const toast = useToast();
 const [startDate, setStartDate] = useState<string>(()=> new Date().toISOString().slice(0,10));
 const [duration, setDuration] = useState<number>(rules.defaultDurationDays);
 const [avoidCount, setAvoidCount] = useState<number>(rules.avoidLastAssignments);
 const [monthsPerExit, setMonthsPerExit] = useState<number>(rules.avoidMonthsPerExit);
 const [recentWeight, setRecentWeight] = useState<number>(rules.recentWeight);
 const [balanceWeight, setBalanceWeight] = useState<number>(rules.balanceWeight);
 const [generated, setGenerated] = useState<Suggestion[] | null>(null);
 const [rankings, setRankings] = useState<Record<ID, { territoryId: ID; score: number; reasons: string[] }[]>>({});

 const generate = () => {
    if (territories.length === 0 || exits.length === 0) { setGenerated([]); setRankings({}); return; }
    const suggestions: Suggestion[] = [];
    const rankingMap: Record<ID, { territoryId: ID; score: number; reasons: string[] }[]> = {};
    const recent = new Set([...assignments]
      .sort((a,b)=> b.startDate.localeCompare(a.startDate))
      .slice(0, avoidCount)
      .map(a => a.territoryId));
    const used = new Set<ID>();
    const exitCounts = exits.map(e=>({ id:e.id, count: assignments.filter(a=>a.fieldExitId===e.id).length }));
    const maxCount = Math.max(1, ...exitCounts.map(x=>x.count));
    const orderedExits = [...exits].sort((a,b)=>{
      const ca = exitCounts.find(x=>x.id===a.id)?.count || 0;
      const cb = exitCounts.find(x=>x.id===b.id)?.count || 0;
      return ca - cb;
    });
    orderedExits.forEach(exit => {
      const exitCount = exitCounts.find(x=>x.id===exit.id)?.count || 0;
      const exitBalance = (maxCount - exitCount)/maxCount;
      const today = new Date(startDate + 'T00:00:00');
      const candidates = territories.filter(t => !recent.has(t.id) && !used.has(t.id)).flatMap(t => {
        const lastForExit = assignments
          .filter(a=> a.territoryId===t.id && a.fieldExitId===exit.id)
          .map(a=> new Date(a.startDate + 'T00:00:00'))
          .sort((a,b)=> b.getTime()-a.getTime())[0];
        if (lastForExit) {
          const months = (today.getTime()-lastForExit.getTime())/1000/60/60/24/30;
          if (months < monthsPerExit) return [];
        }
        const lastOverall = getLastAssignmentDate(t.id, assignments);
        const days = lastOverall ? Math.floor((today.getTime()-lastOverall.getTime())/86400000) : Infinity;
        const recencyPenalty = lastOverall ? 1/(days+1) : 0;
        const score = balanceWeight * exitBalance - recentWeight * recencyPenalty;
        const reasons = [
          `Carga saída ${(exitBalance*100).toFixed(0)}%`,
          lastOverall ? `Recente ${(recencyPenalty*100).toFixed(0)}%` : 'Nunca usado'
        ];
        return [{ territoryId: t.id, score, reasons }];
      }).sort((a,b)=> b.score - a.score);
      rankingMap[exit.id] = candidates;
      const chosen = candidates[0];
      if (chosen) {
        used.add(chosen.territoryId);
        const s = nextDateForDay(startDate, exit.dayOfWeek);
        suggestions.push({ fieldExitId: exit.id, territoryId: chosen.territoryId, startDate: s, endDate: addDays(s, duration) });
      }
    });
    setRankings(rankingMap);
    setGenerated(suggestions);
  };

  const applyAll = () => {
    if (!generated || generated.length === 0) {
      toast.error('Nada para aplicar');
      return;
    }
    generated.forEach(s => addAssignment({ territoryId: s.territoryId, fieldExitId: s.fieldExitId, startDate: s.startDate, endDate: s.endDate }));
    toast.success('Designações aplicadas');
  };

 const saveRuleDefaults = () => setRules({
   avoidLastAssignments: avoidCount,
   defaultDurationDays: duration,
   avoidMonthsPerExit: monthsPerExit,
   recentWeight,
   balanceWeight
 });

  return (
    <div className="grid gap-4">
      <Card title="Regras de Sugestão" actions={<Button onClick={saveRuleDefaults} className="bg-neutral-100">Salvar padrões</Button>}>
        <div className="grid md:grid-cols-6 gap-3">
          <div className="grid gap-1">
            <Label>Data inicial</Label>
            <Input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label>Duração (dias)</Label>
            <Input type="number" min={1} value={duration} onChange={e=>setDuration(Number(e.target.value) || 1)} />
          </div>
          <div className="grid gap-1">
            <Label>Evitar repetição (últimas N)</Label>
            <Input type="number" min={0} value={avoidCount} onChange={e=>setAvoidCount(Number(e.target.value) || 0)} />
          </div>
          <div className="grid gap-1">
            <Label>Repetição por saída (meses)</Label>
            <Input type="number" min={0} value={monthsPerExit} onChange={e=>setMonthsPerExit(Number(e.target.value) || 0)} />
          </div>
          <div className="grid gap-1">
            <Label>Peso recência</Label>
            <Input type="number" min={0} step="0.1" value={recentWeight} onChange={e=>setRecentWeight(Number(e.target.value) || 0)} />
          </div>
          <div className="grid gap-1">
            <Label>Peso carga saída</Label>
            <Input type="number" min={0} step="0.1" value={balanceWeight} onChange={e=>setBalanceWeight(Number(e.target.value) || 0)} />
          </div>
          <div className="flex items-end"><Button onClick={generate} className="bg-black text-white w-full">Gerar Sugestões</Button></div>
        </div>
      </Card>

      <Card title="Sugestões Geradas" actions={generated && generated.length>0 && <Button onClick={applyAll} className="bg-green-600 text-white">Aplicar Tudo</Button>}>
        {generated === null ? (
          <p className="text-neutral-500">Aguardando geração…</p>
        ) : generated.length === 0 ? (
          <p className="text-neutral-500">Sem sugestões (verifique se há territórios e saídas).</p>
        ) : (
          <div className="grid gap-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b"><th className="py-2">Saída</th><th>Território</th><th>Designação</th><th>Devolução</th></tr>
                </thead>
                <tbody>
                  {generated.map((s,i)=> (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2">{findName(s.fieldExitId, exits)}</td>
                      <td>{findName(s.territoryId, territories)}</td>
                      <td>{fmtDate(s.startDate)}</td>
                      <td>{fmtDate(s.endDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(rankings).map(([exitId, list]) => (
                <div key={exitId} className="border rounded-xl p-3">
                  <h4 className="font-semibold mb-2">{findName(exitId, exits)}</h4>
                  <ol className="list-decimal ml-4 space-y-1 text-sm">
                    {list.map(r => (
                      <li key={r.territoryId}>
                        {findName(r.territoryId, territories)} - {r.score.toFixed(2)}
                        <span className="block text-neutral-500">{r.reasons.join(' | ')}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
 }

 // ---------- App ----------
export default function App(){
 const store = useStore();
 const [tab, setTab] = useState<string>('territories');
 const confirm = useConfirm();

  return (
    <StoreContext.Provider value={store}>
      <Shell tab={tab} setTab={setTab}>
        {tab==='territories' && <TerritoriesPage />}
        {tab==='exits' && <ExitsPage />}
        {tab==='assignments' && <AssignmentsPage />}
        {tab==='calendar' && <CalendarPage />}
        {tab==='suggestions' && <SuggestionsPage />}
        <div className="flex justify-end">
          <Button onClick={async()=>{ if(await confirm('Limpar TODOS os dados?')) store.clearAll(); }} className="mt-4 bg-red-600 text-white">Limpar TODOS os dados</Button>
        </div>
      </Shell>
    </StoreContext.Provider>
  );
}