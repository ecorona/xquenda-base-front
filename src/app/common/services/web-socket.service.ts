import { Injectable, EventEmitter } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  // eventos personalizados
  public events = new Subject<{
    event: string;
    data?: { [key: string]: any };
  }>();
  private conectadoSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private conectandoSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  get conectado$(): Observable<boolean> {
    return this.conectadoSubject.asObservable();
  }

  get conectando$(): Observable<boolean> {
    return this.conectandoSubject.asObservable();
  }

  get events$(): Observable<{ event: string; data?: any }> {
    return this.events.asObservable();
  }
  set conectando(val: boolean) {
    this.conectandoSubject.next(val);
  }

  set conectado(val: boolean) {
    this.conectadoSubject.next(val);
  }

  get conectado(): boolean {
    return this.conectadoSubject.getValue();
  }

  get conectando(): boolean {
    return this.conectandoSubject.getValue();
  }

  private socket = io(environment.api, {
    transports: ['websocket'],
    autoConnect: false,
    reconnection: true,
    withCredentials: true,
    path: '/socket.io',
    auth: {
      token: localStorage.getItem('token') || '',
    },
  });

  private token = '';

  constructor() {
    console.log('SocketService > loaded');
  }

  setToken(token: string): void {
    this.token = token;
    this.socket.auth = {
      token,
    };
    if (!this.token) {
      this.disconnect();
      return;
    }

    this.connect();
  }

  private setEvents(): void {
    this.socket.on('connect', () => {
      console.log('SocketService > connected');
      this.conectado = true;
      this.conectando = false;
      this.joinChannels();
      this.events.next({ event: 'connect' });
    });
    this.socket.on('disconnect', () => {
      this.conectado = false;
      console.log('SocketService > disconnected');
      this.events.next({ event: 'disconnect' });
    });
    this.socket.on('reconnecting', () => {
      this.conectando = true;
      console.log('SocketService > reconnecting...');
    });
    this.socket.on('connect_error', (err) => {
      console.log('SocketService > connect_error:', err);
    });
    this.socket.on('exception', (err) => {
      console.log('SocketService > exception:', err);
    });
  }

  private offEvents(): void {
    this.socket.off();
  }

  async sendEvent<T = any>(
    event: string,
    data: {
      [key: string]: any;
    } | null = null
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        this.socket.once(event, (response) => {
          resolve(response);
        });
        this.socket.emit(event, data);
      } catch (error) {
        reject(error);
      }
    });
  }

  async joinChannels(): Promise<boolean> {
    if (this.token) {
      console.log('Joining socket channels...');
      const response = await this.sendEvent('canales', null);
      console.log('SocketService > joinChannels > response:', response);
    }
    return false;
  }

  private connect(): void {
    if (!this.conectado && !this.conectando) {
      console.log('SocketService > connecting > ', environment.api);
      this.conectando = true;
      this.setEvents();
      this.socket.connect();
    }
  }

  private disconnect(): void {
    if (this.conectado) {
      console.log('SocketService > disconnect > ', environment.api);
      this.socket.disconnect();
      this.offEvents();
      return;
    }

    console.log('El socket ya había sido desconectado previamente.');
  }
}
