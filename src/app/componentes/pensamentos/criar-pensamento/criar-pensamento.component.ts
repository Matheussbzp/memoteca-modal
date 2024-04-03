import { Router } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InatividadeModalComponent } from 'src/app/componentes/inatividade-modal/inatividade-modal.component';
import { fromEvent, interval, Subscription } from 'rxjs';
import { debounce, filter } from 'rxjs/operators';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: 'modelo1'
  }

  private inatividadeSubscription: Subscription = new Subscription();
  private tempoRestante: number = 10;

  constructor(
    private service: PensamentoService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.startInatividadeTimer();
  }

  ngOnDestroy(): void {
    this.stopInatividadeTimer();
  }

  startInatividadeTimer() {
    this.inatividadeSubscription = fromEvent(document, 'mousemove').pipe(
      debounce(() => interval(600)), // Verifica a cada minuto
      filter(() => !this.dialog.openDialogs.length) // Verifica se não há outros modais abertos
    ).subscribe(() => {
      const dialogRef = this.dialog.open(InatividadeModalComponent, {
        disableClose: true,
        data: { resetTimer: () => this.resetTimer(), tempoRestante: this.tempoRestante }
      });

      // Redirecionar para a página anterior após o tempo limite de inatividade
      const timer = interval(1000).subscribe(() => {
        if (this.tempoRestante > 0) {
          this.tempoRestante--;
        } else {
          timer.unsubscribe();
          dialogRef.close();
          this.retornarPaginaAnterior();
        }
      });
    });
  }

  stopInatividadeTimer() {
    if (this.inatividadeSubscription) {
      this.inatividadeSubscription.unsubscribe();
    }
  }

  resetTimer() {
    this.tempoRestante = 10; // Reinicia o tempo restante
  }

  retornarPaginaAnterior() {
    this.router.navigate(['/listarPensamento']);
  }

  criarPensamento() {
    this.stopInatividadeTimer(); // Resetar o timer de inatividade
    this.service.criar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })
  }

  cancelar() {
    this.stopInatividadeTimer(); // Resetar o timer de inatividade
    this.router.navigate(['/listarPensamento'])
  }
}
