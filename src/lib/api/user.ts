import axios from "axios";

const baseURL = "https://welwexpress-app.onrender.com/api/v1/welwexpress";

const userApi = axios.create({
  baseURL: `${baseURL}/auth`,
  timeout: 10000,
});

// ------------------------------------------INTERFACES---------------------------------------------------
// Interfaces para resposta de sucesso
interface LoginResponse {
  user: {
    name: string;
    role: string;
  };
  token: string;
}

// Interface para resposta de registro do vendedor
interface SellerRegisterResponse {
  user: {
    msg: string;
    name: string;
    role: string;
  };
  token: string;
}

// Interface para resposta de registro do usuário
interface RegisterResponse {
  user: {
    msg: string;
    name: string;
    role: string;
  };
  token: string;
}

// Interface para resposta de cadastro de funcionário
interface EmployeeRegisterResponse {
  user: {
    msg: string;
    name: string;
    role: string;
  };
  token: string;
}

// Interface para dados do funcionário
interface EmployeeData {
  name: string;
  bi: string;
  email: string;
  phone: string;
  address: string;
  store: string;
}

// --------------------------------------------FUNÇÕES---------------------------------------------------

// Função de Login
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await userApi.post(
      "/login",
      {
        email: email.trim().toLowerCase(),
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(
            error.response.data.message || "Credenciais inválidas"
          );
        case 401:
          throw new Error("Acesso não autorizado");
        case 404:
          throw new Error("Usuário não encontrado");
        case 500:
          throw new Error("Erro interno do servidor");
        default:
          throw new Error(error.response.data.message || "Erro desconhecido");
      }
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Verifique sua conexão.");
    } else {
      throw new Error("Erro ao configurar a requisição");
    }
  }
};

// função para cadastro de vendedor
export const registerSeller = async (
  formData: FormData
): Promise<SellerRegisterResponse> => {
  try {
    const response = await userApi.post("/seller-register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(
            error.response.data.message ||
              "Dados inválidos ou alvará não enviado"
          );
        case 409:
          throw new Error("Email já está em uso");
        case 413:
          throw new Error("Arquivo muito grande");
        case 500:
          throw new Error("Erro interno do servidor");
        default:
          throw new Error(
            error.response.data.message || "Erro ao registrar vendedor"
          );
      }
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Verifique sua conexão.");
    } else {
      throw new Error("Erro ao configurar a requisição");
    }
  }
};

// Atualize a função registerBuyer
export const registerBuyer = async (
  name: string,
  email: string,
  password: string
): Promise<{ user: any; token: string }> => {
  // Tipo mais específico
  try {
    const response = await userApi.post(
      "/register",
      {
        // Verifique o endpoint correto
        name,
        email: email.trim().toLowerCase(),
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error: any) {
    // Mantenha o tratamento de erro existente
    throw error;
  }
};
// Função para cadastro de funcionário
export const registerEmployee = async (
  employeeData: EmployeeData,
  token: string
): Promise<EmployeeRegisterResponse> => {
  try {
    const response = await userApi.post("/login", employeeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(error.response.data.message || "Dados inválidos");
        case 401:
          throw new Error("Acesso não autorizado");
        case 403:
          throw new Error("Apenas vendedores podem cadastrar funcionários");
        case 404:
          throw new Error("Loja não encontrada");
        case 409:
          throw new Error("Email já está em uso");
        case 500:
          throw new Error("Erro interno do servidor");
        default:
          throw new Error(
            error.response.data.message || "Erro ao registrar funcionário"
          );
      }
    } else if (error.request) {
      throw new Error("Servidor não respondeu. Verifique sua conexão.");
    } else {
      throw new Error("Erro ao configurar a requisição");
    }
  }
};

// Terminar sessão
export const logout = async () => {
  try {
    localStorage.removeItem("token");
    return "Sessão terminada!";
  } catch (error: any) {
    throw new Error("ao terminar a sessão");
  }
};
