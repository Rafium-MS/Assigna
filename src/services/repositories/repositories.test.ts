import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';

import { db, migrate } from '../db';
import {
  BuildingVillageRepository,
  DesignacaoRepository,
  SaidaRepository,
  SugestaoRepository,
  TerritorioRepository,
  NaoEmCasaRepository
} from '.';
import type { BuildingVillage } from '../../types/building_village';
import type { Designacao } from '../../types/designacao';
import type { Saida } from '../../types/saida';
import type { Sugestao } from '../../types/sugestao';
import type { Territorio } from '../../types/territorio';
import type { NaoEmCasaRegistro } from '../../types/nao-em-casa';

beforeEach(async () => {
  await db.delete();
  await migrate();
});

describe('TerritorioRepository', () => {
  it('adds a territorio and retrieves it with all', async () => {
    const territorio: Territorio = { id: 'territorio-1', nome: 'Territory 1', publisherId: 'publisher-1' };

    await TerritorioRepository.add(territorio);
    const stored = await TerritorioRepository.all();

    expect(stored).toEqual([territorio]);
  });

  it('bulk adds multiple territorios and retrieves them all', async () => {
    const territorios: Territorio[] = [
      { id: 'territorio-1', nome: 'Territory 1', publisherId: 'publisher-1' },
      { id: 'territorio-2', nome: 'Territory 2', publisherId: 'publisher-2' },
      { id: 'territorio-3', nome: 'Territory 3', publisherId: 'publisher-3' }
    ];

    await TerritorioRepository.bulkAdd(territorios);
    const stored = await TerritorioRepository.all();

    expect(stored).toHaveLength(territorios.length);
    expect(stored).toEqual(expect.arrayContaining(territorios));
  });

  it('removes a territorio by id', async () => {
    const territorios: Territorio[] = [
      { id: 'territorio-1', nome: 'Territory 1', publisherId: 'publisher-1' },
      { id: 'territorio-2', nome: 'Territory 2', publisherId: 'publisher-2' }
    ];

    await TerritorioRepository.bulkAdd(territorios);
    await TerritorioRepository.remove('territorio-1');
    const stored = await TerritorioRepository.all();

    expect(stored).toHaveLength(1);
    expect(stored[0]).toEqual(territorios[1]);
  });

  it('clears all territorios', async () => {
    const territorios: Territorio[] = [
      { id: 'territorio-1', nome: 'Territory 1', publisherId: 'publisher-1' },
      { id: 'territorio-2', nome: 'Territory 2', publisherId: 'publisher-2' }
    ];

    await TerritorioRepository.bulkAdd(territorios);
    await TerritorioRepository.clear();
    const stored = await TerritorioRepository.all();

    expect(stored).toEqual([]);
  });
});

describe('SaidaRepository', () => {
  it('adds a saida and retrieves it with all', async () => {
    const saida: Saida = {
      id: 'saida-1',
      nome: 'Saida 1',
      diaDaSemana: 1,
      hora: '08:00',
      publisherId: 'publisher-1'
    };

    await SaidaRepository.add(saida);
    const stored = await SaidaRepository.all();

    expect(stored).toEqual([saida]);
  });

  it('bulk adds multiple saidas and retrieves them all', async () => {
    const saidas: Saida[] = [
      { id: 'saida-1', nome: 'Saida 1', diaDaSemana: 1, hora: '08:00', publisherId: 'publisher-1' },
      { id: 'saida-2', nome: 'Saida 2', diaDaSemana: 2, hora: '09:30', publisherId: 'publisher-2' }
    ];

    await SaidaRepository.bulkAdd(saidas);
    const stored = await SaidaRepository.all();

    expect(stored).toHaveLength(saidas.length);
    expect(stored).toEqual(expect.arrayContaining(saidas));
  });

  it('removes a saida by id', async () => {
    const saidas: Saida[] = [
      { id: 'saida-1', nome: 'Saida 1', diaDaSemana: 1, hora: '08:00', publisherId: 'publisher-1' },
      { id: 'saida-2', nome: 'Saida 2', diaDaSemana: 2, hora: '09:30', publisherId: 'publisher-2' }
    ];

    await SaidaRepository.bulkAdd(saidas);
    await SaidaRepository.remove('saida-1');
    const stored = await SaidaRepository.all();

    expect(stored).toHaveLength(1);
    expect(stored[0]).toEqual(saidas[1]);
  });
});

describe('DesignacaoRepository', () => {
  it('adds a designacao and retrieves it with all', async () => {
    const designacao: Designacao = {
      id: 'designacao-1',
      territorioId: 'territorio-1',
      saidaId: 'saida-1',
      dataInicial: '2024-01-01',
      dataFinal: '2024-01-31',
      publisherId: 'publisher-1'
    };

    await DesignacaoRepository.add(designacao);
    const stored = await DesignacaoRepository.all();

    expect(stored).toEqual([designacao]);
  });

  it('bulk adds multiple designacoes and retrieves them all', async () => {
    const designacoes: Designacao[] = [
      {
        id: 'designacao-1',
        territorioId: 'territorio-1',
        saidaId: 'saida-1',
        dataInicial: '2024-01-01',
        dataFinal: '2024-01-31',
        publisherId: 'publisher-1'
      },
      {
        id: 'designacao-2',
        territorioId: 'territorio-2',
        saidaId: 'saida-2',
        dataInicial: '2024-02-01',
        dataFinal: '2024-02-29',
        publisherId: 'publisher-2'
      }
    ];

    await DesignacaoRepository.bulkAdd(designacoes);
    const stored = await DesignacaoRepository.all();

    expect(stored).toHaveLength(designacoes.length);
    expect(stored).toEqual(expect.arrayContaining(designacoes));
  });

  it('removes a designacao by id', async () => {
    const designacoes: Designacao[] = [
      {
        id: 'designacao-1',
        territorioId: 'territorio-1',
        saidaId: 'saida-1',
        dataInicial: '2024-01-01',
        dataFinal: '2024-01-31',
        publisherId: 'publisher-1'
      },
      {
        id: 'designacao-2',
        territorioId: 'territorio-2',
        saidaId: 'saida-2',
        dataInicial: '2024-02-01',
        dataFinal: '2024-02-29',
        publisherId: 'publisher-2'
      }
    ];

    await DesignacaoRepository.bulkAdd(designacoes);
    await DesignacaoRepository.remove('designacao-1');
    const stored = await DesignacaoRepository.all();

    expect(stored).toHaveLength(1);
    expect(stored[0]).toEqual(designacoes[1]);
  });
});

describe('SugestaoRepository', () => {
  it('adds a sugestao and retrieves it with all', async () => {
    const sugestao: Sugestao = {
      territorioId: 'territorio-1',
      saidaId: 'saida-1',
      dataInicial: '2024-03-01',
      dataFinal: '2024-03-31',
      publisherId: 'publisher-1'
    };

    await SugestaoRepository.add(sugestao);
    const stored = await SugestaoRepository.all();

    expect(stored).toEqual([sugestao]);
  });

  it('bulk adds multiple sugestoes and retrieves them all', async () => {
    const sugestoes: Sugestao[] = [
      {
        territorioId: 'territorio-1',
        saidaId: 'saida-1',
        dataInicial: '2024-03-01',
        dataFinal: '2024-03-31',
        publisherId: 'publisher-1'
      },
      {
        territorioId: 'territorio-2',
        saidaId: 'saida-2',
        dataInicial: '2024-04-01',
        dataFinal: '2024-04-30',
        publisherId: 'publisher-2'
      }
    ];

    await SugestaoRepository.bulkAdd(sugestoes);
    const stored = await SugestaoRepository.all();

    expect(stored).toHaveLength(sugestoes.length);
    expect(stored).toEqual(expect.arrayContaining(sugestoes));
  });

  it('removes a sugestao by composite key', async () => {
    const sugestoes: Sugestao[] = [
      {
        territorioId: 'territorio-1',
        saidaId: 'saida-1',
        dataInicial: '2024-03-01',
        dataFinal: '2024-03-31',
        publisherId: 'publisher-1'
      },
      {
        territorioId: 'territorio-2',
        saidaId: 'saida-2',
        dataInicial: '2024-04-01',
        dataFinal: '2024-04-30',
        publisherId: 'publisher-2'
      }
    ];

    await SugestaoRepository.bulkAdd(sugestoes);
    await SugestaoRepository.remove('territorio-1', 'saida-1');
    const stored = await SugestaoRepository.all();

    expect(stored).toHaveLength(1);
    expect(stored[0]).toEqual(sugestoes[1]);
  });
});

describe('NaoEmCasaRepository', () => {
  it('adds a record and retrieves it', async () => {
    const record: NaoEmCasaRegistro = {
      id: 'record-1',
      territorioId: 'territorio-1',
      publisherId: 'publisher-1',
      addressId: 1,
      streetId: 2,
      streetName: 'Main St',
      numberStart: 10,
      numberEnd: 12,
      propertyTypeId: 3,
      propertyTypeName: 'Residencial',
      recordedAt: '2024-01-01',
      followUpAt: '2024-05-01',
      completedAt: null
    };

    await NaoEmCasaRepository.add(record);
    const stored = await NaoEmCasaRepository.all();

    expect(stored).toEqual([record]);
  });

  it('bulk adds records and removes them individually', async () => {
    const records: NaoEmCasaRegistro[] = [
      {
        id: 'record-1',
        territorioId: 'territorio-1',
        publisherId: 'publisher-1',
        addressId: 1,
        recordedAt: '2024-01-01',
        followUpAt: '2024-05-01',
        completedAt: null
      },
      {
        id: 'record-2',
        territorioId: 'territorio-2',
        publisherId: 'publisher-2',
        addressId: 2,
        recordedAt: '2024-02-01',
        followUpAt: '2024-06-01',
        completedAt: null
      }
    ];

    await NaoEmCasaRepository.bulkAdd(records);
    await NaoEmCasaRepository.remove('record-1');
    const stored = await NaoEmCasaRepository.all();

    expect(stored).toEqual([records[1]]);
  });
});

describe('BuildingVillageRepository', () => {
  it('adds a building or village and retrieves it with all', async () => {
    const buildingVillage: BuildingVillage = {
      id: 'bv-1',
      territory_id: 'territory-1',
      publisherId: 'publisher-1',
      name: 'Building One',
      address_line: '123 Main St',
      type: 'building',
      number: '123',
      residences_count: 10,
      modality: 'vertical',
      reception_type: 'concierge',
      responsible: 'John Doe',
      contact_method: 'Phone',
      letter_status: 'sent',
      letter_history: [
        {
          id: 'history-1',
          status: 'sent',
          sent_at: '2024-05-02T00:00:00.000Z',
          notes: 'Initial contact'
        }
      ],
      assigned_at: '2024-05-01',
      returned_at: null,
      block: 'A',
      notes: 'First building',
      created_at: '2024-05-01'
    };

    await BuildingVillageRepository.add(buildingVillage);
    const stored = await BuildingVillageRepository.all();

    expect(stored).toEqual([buildingVillage]);
  });

  it('bulk adds multiple buildings or villages and retrieves them all', async () => {
    const buildingsVillages: BuildingVillage[] = [
      {
        id: 'bv-1',
        territory_id: 'territory-1',
        publisherId: 'publisher-1',
        name: 'Building One',
        address_line: '123 Main St',
        type: 'building',
        number: '123',
        residences_count: 10,
        modality: 'vertical',
        reception_type: 'concierge',
        responsible: 'John Doe',
        contact_method: 'Phone',
        letter_status: 'sent',
        letter_history: [
          {
            id: 'history-1',
            status: 'sent',
            sent_at: '2024-05-02T00:00:00.000Z',
            notes: 'Initial contact'
          }
        ],
        assigned_at: '2024-05-01',
        returned_at: null,
        block: 'A',
        notes: 'First building',
        created_at: '2024-05-01'
      },
      {
        id: 'bv-2',
        territory_id: 'territory-2',
        publisherId: 'publisher-2',
        name: 'Village Two',
        address_line: null,
        type: null,
        number: null,
        residences_count: null,
        modality: null,
        reception_type: null,
        responsible: null,
        contact_method: null,
        letter_status: null,
        letter_history: [],
        assigned_at: null,
        returned_at: null,
        block: null,
        notes: null,
        created_at: null
      }
    ];

    await BuildingVillageRepository.bulkAdd(buildingsVillages);
    const stored = await BuildingVillageRepository.all();

    expect(stored).toHaveLength(buildingsVillages.length);
    expect(stored).toEqual(expect.arrayContaining(buildingsVillages));
  });

  it('removes a building or village by id', async () => {
    const buildingsVillages: BuildingVillage[] = [
      {
        id: 'bv-1',
        territory_id: 'territory-1',
        publisherId: 'publisher-1',
        name: 'Building One',
        address_line: '123 Main St',
        type: 'building',
        number: '123',
        residences_count: 10,
        modality: 'vertical',
        reception_type: 'concierge',
        responsible: 'John Doe',
        contact_method: 'Phone',
        letter_status: 'sent',
        letter_history: [
          {
            id: 'history-1',
            status: 'sent',
            sent_at: '2024-05-02T00:00:00.000Z',
            notes: 'Initial contact'
          }
        ],
        assigned_at: '2024-05-01',
        returned_at: null,
        block: 'A',
        notes: 'First building',
        created_at: '2024-05-01'
      },
      {
        id: 'bv-2',
        territory_id: 'territory-2',
        publisherId: 'publisher-2',
        name: 'Village Two',
        address_line: null,
        type: null,
        number: null,
        residences_count: null,
        modality: null,
        reception_type: null,
        responsible: null,
        contact_method: null,
        letter_status: null,
        letter_history: [],
        assigned_at: null,
        returned_at: null,
        block: null,
        notes: null,
        created_at: null
      }
    ];

    await BuildingVillageRepository.bulkAdd(buildingsVillages);
    await BuildingVillageRepository.remove('bv-1');
    const stored = await BuildingVillageRepository.all();

    expect(stored).toHaveLength(1);
    expect(stored[0]).toEqual(buildingsVillages[1]);
  });
});
