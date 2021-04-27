export class Perfil {
    codigo: number;
}

export class Usuario {
    codigo: number;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    perfil = new Perfil();
}

export class Prato {
    codigo: number;
    descricao: string;
    valor: number;
    quantidade: string;
    usuario = new Usuario();
}
  