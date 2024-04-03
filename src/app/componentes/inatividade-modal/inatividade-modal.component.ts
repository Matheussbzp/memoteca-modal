import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inatividade-modal',
  templateUrl: './inatividade-modal.component.html',
  styleUrls: ['./inatividade-modal.component.css']
})
export class InatividadeModalComponent implements OnInit {
  tempoRestante: number;

  constructor(
    public dialogRef: MatDialogRef<InatividadeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tempoRestante = 10; // Valor inicial do contador regressivo
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown() {
    const interval = setInterval(() => {
      if (this.tempoRestante > 0) {
        this.tempoRestante--;
      } else {
        clearInterval(interval);
        this.fecharModal();
      }
    }, 1000); // Atualiza o contador a cada segundo
  }

  fecharModal() {
    this.dialogRef.close();
    this.data.resetTimer(); // Reinicia o timer quando o modal é fechado
  }
}
