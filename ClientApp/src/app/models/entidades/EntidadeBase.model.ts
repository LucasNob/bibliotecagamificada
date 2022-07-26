export class EntidadeBase{
    id: string = "";
    dataCriacao: Date = new Date();
    dataAlteracao: Date = new Date();
    dataExclusao?: Date = new Date();
    status: boolean = false;
}