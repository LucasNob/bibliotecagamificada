export class EntidadeBase{
    id: String = "";
    dataCriacao: Date = new Date();
    dataAlteracao: Date = new Date();
    dataExclusao?: Date = new Date();
    status: boolean = false;
}