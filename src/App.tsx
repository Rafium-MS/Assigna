import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
 }; 
 type SuggestionRuleConfig = {
  avoidRepeatMonths: number; // avoid repeating same territory for the same exit within N months
  defaultDurationDays: number; // default assignment length
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
 const monthsDiff = (a: Date, b: Date) => (a.getFullYear()-b.getFullYear())*12 + (a.getMonth()-b.getMonth());

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
  const [territories, setTerritories] = useLocalStorage<Territory[]>("tm.territories", []);
  const [exits, setExits] = useLocalStorage<FieldExit[]>("tm.exits", []);
  const [assignments, setAssignments] = useLocalStorage<Assignment[]>("tm.assignments", []);
  const [rules, setRules] = useLocalStorage<SuggestionRuleConfig>("tm.rules", { avoidRepeatMonths: 2, defaultDurationDays: 30 });

  // CRUD helpers
  const addTerritory = (t: Omit<Territory, 'id'>) => setTerritories(prev => [{ id: uid(), ...t }, ...prev]);
  const delTerritory = (id: ID) => {
    setTerritories(prev => prev.filter(t => t.id !== id));
    setAssignments(prev => prev.filter(a => a.territoryId !== id));
  };
  const updateTerritory = (id: ID, t: Omit<Territory, 'id'>) =>
    setTerritories(prev => prev.map(x => (x.id === id ? { ...x, ...t } : x)));

  const addExit = (e: Omit<FieldExit, 'id'>) => setExits(prev => [{ id: uid(), ...e }, ...prev]);
  const delExit = (id: ID) => {
    setExits(prev => prev.filter(e => e.id !== id));
    setAssignments(prev => prev.filter(a => a.fieldExitId !== id));
  };
  const updateExit = (id: ID, e: Omit<FieldExit, 'id'>) =>
    setExits(prev => prev.map(x => (x.id === id ? { ...x, ...e } : x)));

  const addAssignment = (a: Omit<Assignment,'id'>) => setAssignments(prev => [{ id: uid(), ...a }, ...prev]);
  const delAssignment = (id: ID) => setAssignments(prev => prev.filter(a => a.id !== id));
  const updateAssignment = (id: ID, a: Omit<Assignment,'id'>) =>
    setAssignments(prev => prev.map(x => (x.id === id ? { ...x, ...a } : x)));

  const clearAll = () => {
    if (confirm('Tem certeza que deseja limpar TODOS os dados?')) {
      setTerritories([]); setExits([]); setAssignments([]);
    }
  };

  return { territories, exits, assignments, rules, setRules, addTerritory, delTerritory, updateTerritory, addExit, delExit, updateExit, addAssignment, delAssignment, updateAssignment, clearAll };
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
 const ImagePicker: React.FC<{ value?: string; onChange: (dataUrl?: string) => void }>=({ value, onChange })=>{
  const handleFile = async (file?: File) => {
    if (!file) return onChange(undefined);
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
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

 function Shell({children}:{children: React.ReactNode}){
  const [dark, setDark] = useState<boolean>(()=> window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(()=>{
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.classList.add('min-h-full');
    document.body.classList.add('bg-neutral-50','dark:bg-neutral-950');
  },[dark]);
  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100">
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
  );
 }

 function Tabs({tab, setTab}:{tab:string; setTab:(t:string)=>void}){
  const tabs = [
    { id: 'territories', label: 'Territórios' },
    { id: 'exits', label: 'Saídas de Campo' },
    { id: 'assignments', label: 'Designações' },
    { id: 'suggestions', label: 'Sugestões' },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map(t => (
        <button key={t.id} onClick={()=>setTab(t.id)} className={`px-3 py-2 rounded-xl border ${tab===t.id ? 'bg-black text-white' : 'bg-white dark:bg-neutral-900'}`}>{t.label}</button>
      ))}
        );
    </div>
 }
 // ---------- Helpers used by pages ----------
 const findName = (id: ID, list: {id:ID,name:string}[]) => list.find(x=>x.id===id)?.name || '—';

 // ---------- Pages ----------
 const TerritoriesPage: React.FC = () => {
  const { territories, addTerritory, delTerritory, updateTerritory } = useStoreContext();

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
            <ImagePicker value={watch('image')} onChange={v => setValue('image', v)} />
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
                        <Button onClick={() => delTerritory(t.id)} className="bg-red-50 text-red-700">Excluir</Button>
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
                <Button onClick={()=>delExit(e.id)} className="bg-red-50 text-red-700">Excluir</Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
 }

 const AssignmentsPage: React.FC = () => {
  const { territories, exits, assignments, addAssignment, delAssignment } = useStoreContext();
  const [territoryId, setTerritoryId] = useState<ID>("");
  const [exitId, setExitId] = useState<ID>("");
  const todayIso = new Date().toISOString().slice(0,10);
  const [startDate, setStartDate] = useState<string>(todayIso);
  const [endDate, setEndDate] = useState<string>(addDays(todayIso, 30));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!territoryId || !exitId) return;
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
          <div className="flex items-end justify-end">
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(a => (
                  <tr key={a.id} className="border-b last:border-0">
                    <td className="py-2">{findName(a.territoryId, territories)}</td>
                    <td>{findName(a.fieldExitId, exits)}</td>
                    <td>{fmtDate(a.startDate)}</td>
                    <td>{fmtDate(a.endDate)}</td>
                    <td className="text-right"><Button onClick={()=>delAssignment(a.id)} className="bg-red-50 text-red-700">Excluir</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
 }

 // ---------- Suggestions Engine ----------
 type Suggestion = { fieldExitId: ID; territoryId: ID; startDate: string; endDate: string };

 function getLastAssignmentDateFor(territoryId: ID, fieldExitId: ID, assignments: Assignment[]): Date | undefined {
  const arr = assignments
    .filter(a => a.territoryId === territoryId && a.fieldExitId === fieldExitId)
    .map(a => new Date(a.startDate + 'T00:00:00'))
    .sort((a,b)=> b.getTime()-a.getTime());
  return arr[0];
 }

 const SuggestionsPage: React.FC = () => {
  const { territories, exits, assignments, rules, setRules, addAssignment } = useStoreContext();
  const [startDate, setStartDate] = useState<string>(()=> new Date().toISOString().slice(0,10));
  const [duration, setDuration] = useState<number>(rules.defaultDurationDays);
  const [avoidMonths, setAvoidMonths] = useState<number>(rules.avoidRepeatMonths);
  const [generated, setGenerated] = useState<Suggestion[] | null>(null);

  const generate = () => {
    if (territories.length === 0 || exits.length === 0) { setGenerated([]); return; }
    const suggestions: Suggestion[] = [];
    const start = new Date(startDate + 'T00:00:00');

    const rankedForExit = (exitId: ID) => {
      const candidates = territories.filter(t => {
        const last = getLastAssignmentDateFor(t.id, exitId, assignments);
        if (!last) return true;
        const diff = (start.getFullYear()-last.getFullYear())*12 + (start.getMonth()-last.getMonth());
        return diff >= avoidMonths;
      });
      // Sort by oldest last assignment (undefined first)
      return [...candidates].sort((t1, t2) => {
        const d1 = getLastAssignmentDateFor(t1.id, exitId, assignments);
        const d2 = getLastAssignmentDateFor(t2.id, exitId, assignments);
        if (!d1 && d2) return -1;
        if (!d2 && d1) return 1;
        if (!d1 && !d2) return 0;
        return (d1!.getTime() - d2!.getTime());
      });
    };

    exits.forEach(exit => {
      const ranked = rankedForExit(exit.id);
      if (ranked[0]) {
        suggestions.push({ fieldExitId: exit.id, territoryId: ranked[0].id, startDate, endDate: addDays(startDate, duration) });
      }
    });

    setGenerated(suggestions);
  };

  const applyAll = () => {
    if (!generated || generated.length === 0) return;
    generated.forEach(s => addAssignment({ territoryId: s.territoryId, fieldExitId: s.fieldExitId, startDate: s.startDate, endDate: s.endDate }));
    alert('Designações aplicadas!');
  };

  const saveRuleDefaults = () => setRules({ avoidRepeatMonths: avoidMonths, defaultDurationDays: duration });

  return (
    <div className="grid gap-4">
      <Card title="Regras de Sugestão" actions={<Button onClick={saveRuleDefaults} className="bg-neutral-100">Salvar padrões</Button>}>
        <div className="grid md:grid-cols-4 gap-3">
          <div className="grid gap-1">
            <Label>Data inicial</Label>
            <Input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label>Duração (dias)</Label>
            <Input type="number" min={1} value={duration} onChange={e=>setDuration(Number(e.target.value) || 1)} />
          </div>
          <div className="grid gap-1">
            <Label>Evitar repetição por (meses)</Label>
            <Input type="number" min={0} value={avoidMonths} onChange={e=>setAvoidMonths(Number(e.target.value) || 0)} />
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
        )}
      </Card>
    </div>
  );
 }

 // ---------- App ----------
 export default function App(){
  const store = useStore();
  const [tab, setTab] = useState<string>('territories');

  return (
    <StoreContext.Provider value={store}>
      <Shell>
        <Tabs tab={tab} setTab={setTab} />
        {tab==='territories' && <TerritoriesPage />}
        {tab==='exits' && <ExitsPage />}
        {tab==='assignments' && <AssignmentsPage />}
        {tab==='suggestions' && <SuggestionsPage />}
        <div className="flex justify-end">
          <Button onClick={store.clearAll} className="mt-4 bg-red-600 text-white">Limpar TODOS os dados</Button>
        </div>
      </Shell>
    </StoreContext.Provider>
  );
 }