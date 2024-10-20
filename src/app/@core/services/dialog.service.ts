import { ComponentRef, Injectable, Injector, Provider, Type, ViewContainerRef } from '@angular/core';
import { DialogRef } from './dialogref.service';
import { DialogComponent } from '../../@theme/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  /** Propriedade responsável por armazenar a referência do dialogo */
  dialogRef!: DialogRef;

  /** Propriedade responsável por armazenar a referência do componente */
  componentRef!: ComponentRef<DialogComponent>;

  /**
     * Inicializa uma nova instância da classe DialogService.
     *
     * @param {ViewContainerRef} viewContainerRef - A referência do contêiner de visualização.
     * @param {Injector} injector - A instância do injector.
     */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
  ) {
  }

  /**
   * Abre uma nova instância de diálogo com o tipo de componente especificado e dados e configuração opcionais.
   *
   * @param {Type<T>} componentType - Componente a ser renderizado dentro do diálogo.
   * @param {any} [data] - Os dados a serem passados para o componente.
   * @param {DialogConfig} [config] - A configuração do diálogo.
   * @return {DialogRef} A referência para o diálogo recém-aberto.
   */

  open<T>(componentType: Type<T>, data?: any): DialogRef {
    //Cria uma nova referência para o dialogo
    this.dialogRef = new DialogRef();

    //Cria um novo provider utilizando a referência do dialogo.
    const providers: Provider[] = [{ provide: DialogRef, useValue: this.dialogRef }];

    //Cria um novo injector com os providers criados e o injector pai.
    const injector = Injector.create({ providers: providers, parent: this.injector });

    //Cria o componente dialogo com o injector criado.
    this.componentRef = this.viewContainerRef.createComponent(DialogComponent, { injector: injector });

    //Atribui os valores para o Dialogo
    this.componentRef.instance.componentType = componentType;
    this.componentRef.instance.componentRef = this.componentRef;
    this.componentRef.instance.data = data;

    //Fica ouvindo o close do componente e chama o close do diálogo
    this.componentRef.instance.close.subscribe(() => this.close());

    //Fica ouvindo o close da referência do diálogo e chama o close do componente
    this.dialogRef.onClose.subscribe(() => this.close());

    return this.dialogRef;
  }

  /**
   * Fecha o diálogo fazendo o componente desaparecer gradualmente e o destruindo após um atraso.
   *
   * @return {void} Esta função não retorna nada.
   */
  close(): void {

    if (!this.componentRef) return;

    this.componentRef.location.nativeElement.style.opacity = '0';

    setTimeout(() => {
      if (!this.componentRef) return;

      this.dialogRef.close();
      this.componentRef.destroy();
    }, 200);

  }

}