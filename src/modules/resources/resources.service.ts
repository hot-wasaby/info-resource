import { Injectable, NotFoundException } from '@nestjs/common';
import { ResourceEntity } from '../../entities/resource.entity';

@Injectable()
export class ResourcesService {
  private resources: ResourceEntity[] = [
    { id: 1, name: 'Panouri solare', description: 'Panouri pentru energie solară', category: 'Energie', price: 500 },
    { id: 2, name: 'Turbina eoliană', description: 'Generare energie din vânt', category: 'Energie', price: 1200 },
    { id: 3, name: 'Baterie litiu', description: 'Stocare energie regenerabilă', category: 'Stocare', price: 800 },
    { id: 4, name: 'Sistem irigații inteligente', description: 'Reduce consumul de apă', category: 'Agricultură', price: 300 },
    { id: 5, name: 'Izolație ecologică', description: 'Materiale sustenabile pentru clădiri', category: 'Construcții', price: 200 },
    { id: 6, name: 'Filtru apă', description: 'Purificare apă potabilă', category: 'Apă', price: 150 },
    { id: 7, name: 'Lampă LED solară', description: 'Iluminare din energie solară', category: 'Iluminat', price: 50 },
    { id: 8, name: 'Stație încărcare EV', description: 'Încărcător pentru vehicule electrice', category: 'Transport', price: 1000 },
    { id: 9, name: 'Compostor', description: 'Reciclare resturi alimentare', category: 'Mediu', price: 100 },
    { id: 10, name: 'Acoperiș verde', description: 'Reducere efect de seră urban', category: 'Construcții', price: 1500 },
  ];

  findAll(): ResourceEntity[] {
    return this.resources;
  }

  findOneById(id: number): ResourceEntity {
    const resource = this.resources.find((r) => r.id === id);
    if (!resource) {
      throw new NotFoundException(`Resource with id=${id} not found`);
    }
    return resource;
  }

  search(name?: string, minPrice?: number, maxPrice?: number): ResourceEntity[] {
    return this.resources.filter((resource) => {
      let ok = true;
      if (name) {
        ok = ok && resource.name.toLowerCase().includes(name.toLowerCase());
      }
      if (minPrice !== undefined) {
        ok = ok && resource.price >= minPrice;
      }
      if (maxPrice !== undefined) {
        ok = ok && resource.price <= maxPrice;
      }
      return ok;
    });
  }

  create(resource: ResourceEntity): ResourceEntity {
    const newId = this.resources.length > 0 ? Math.max(...this.resources.map(r => r.id)) + 1 : 1;
    const newResource = { ...resource, id: newId };
    this.resources.push(newResource);
    return newResource;
  }

  update(id: number, updated: Partial<ResourceEntity>): ResourceEntity {
    const index = this.resources.findIndex(r => r.id === id);
    if (index === -1) {
      throw new NotFoundException(`Resource with id=${id} not found`);
    }
    this.resources[index] = { ...this.resources[index], ...updated };
    return this.resources[index];
  }

  delete(id: number): void {
    const index = this.resources.findIndex(r => r.id === id);
    if (index === -1) {
      throw new NotFoundException(`Resource with id=${id} not found`);
    }
    this.resources.splice(index, 1);
  }
}