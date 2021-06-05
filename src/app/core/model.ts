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
    bairro: string;
    rua: string;
    numero: string;
    complemento: string;
    cidade = new Cidade();
}

export class Prato {
    codigo: number;
    descricao: string;
    valor: number;
    quantidade: string;
    cozinheira = new Usuario();
    cliente = new Usuario();
    entregador = new Usuario();
}

export class Pedido {
    codigo: number;
    status: string;
    cliente = new Usuario();
    entregador = new Usuario();
    pratos: Prato[];
}

export class Venda {
    codigo: number;
    pedido = new Pedido();
    prato = new Prato();
    quantidade: string;
    valor: number;
    entregador = new Usuario();
    cozinheira = new Usuario();
}
