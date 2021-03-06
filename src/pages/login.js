import React from 'react';

import nookies from 'nookies';

import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const [githubUsername, setGithubUsername] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    alert(githubUsername);

    const response = await fetch('https://alurakut.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ githubUser: githubUsername })
    });

    const data = await response.json();

    const { token } = data;

    nookies.set(null, 'USER_TOKEN', token, {
      path: '/',
      maxAge: 86400,
    });

    router.push('/', {});
  }

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={handleLogin}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input onChange={(e) => setGithubUsername(e.target.value)} placeholder="Usuário" value={githubUsername} />
            {githubUsername.length === 0 ? 'Preencha o seu username' : ''}
            <button type="submit">
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
                </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}