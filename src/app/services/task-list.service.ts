import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environment/environment';

const supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

@Injectable({ providedIn: 'root' })
export class TaskListService {
  getTasks() {
    return supabase.from('Tasks').select('*').order('dueDate');
  }

  addTask(task: any) {
    return supabase.from('Tasks').insert([task]);
  }

  updateStatus(id: string, status: boolean) {
    return supabase.from('Tasks').update({ status }).eq('id', id);
  }
}
