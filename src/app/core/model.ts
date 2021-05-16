export class Perfil {
    codigo: number;
}

export class Pais {
    codigo: number;
    nome: string;
}

export class Estado {
    codigo: number;
    nome: string;
    pais = new Pais();
}

export class Cidade {
    codigo: number;
    nome: string;
    estado = new Estado();
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
    status: string;
    valor: number;
    quantidade: string;
    cozinheira = new Usuario();
    cliente = new Usuario();
    entregador = new Usuario();
}
  