import { useEffect, useState } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

import { OrkutMenu, OrkutNostalgicIconSet, OrkutProfileSidebarMenuDefault } from '../lib/OrkutCommons';

import Box from '../components/Box';
import MainGrid from '../components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations';

function ProfileSideBar({ githubUsername }) {
  return (
    <div className="profile" style={{ gridArea: 'profile' }}>
      <Box as="aside">
        <img src={`https://github.com/${githubUsername}.png`} />

        <hr />

        <p>
          <a href={`https://github.com/${githubUsername}`} className="boxLink">
            {githubUsername}
          </a>
        </p>
        <hr />

        <OrkutProfileSidebarMenuDefault />
      </Box>
    </div>
  )
}

export default function Home(props) {
  const { githubUsername } = props;
  const [favoritePersons, setFavoritePersons] = useState([
    'Viviane-Queiroz',
    'Viviane-Queiroz',
    'Viviane-Queiroz',
    'Viviane-Queiroz',
    'Viviane-Queiroz',
    'Viviane-Queiroz'
  ]);

  const [communities, setCommunities] = useState([]);
  const [communityName, setCommunityName] = useState('');
  const [communityURL, setCommunityURL] = useState('');

  const handleCreateCommunity = async (event) => {
    event.preventDefault();

    if (communityName.length > 0 && communityURL.length > 0 && communities.length < 6) {
      // const formData = new FormData(event.target);
      // const newCommunity = {
      //   title: formData.get('title'),
      //   image: formData.get('image'),
      // }

      await fetch('/api/communities', {
        method: 'POST',
        body: JSON.stringify({
          title: communityName,
          image: communityURL
        })
      });

      setCommunities((prevCommunities) => prevCommunities.concat({ title: communityName, image: communityURL }));
      setCommunityName('');
      setCommunityURL('');
    }
  }

  const fetchFavoritePersons = async () => {
    const response = await fetch('https://api.github.com/users/joaobispo2077/following');
    const follwingPersons = await response.json();
    const folloingNames = follwingPersons.map(favoritePerson => favoritePerson.login);
    setFavoritePersons(folloingNames);
  }

  const fethCommunities = async () => {
    const response = await fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '9969f1eb2bf6730cf127aa36f6bcb7',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": `
    query {
      allCommunities {
        id
        title
        image
      }
    }
    `
      })
    });

    const payload = await response.json();
    const { allCommunities } = payload.data;
    console.log(payload
      , allCommunities);

    setCommunities(allCommunities);
  }

  useEffect(() => {
    fetchFavoritePersons();
    fethCommunities();


  }, []);
  return (
    <>
      <OrkutMenu githubUser={githubUsername} />
      <MainGrid>
        <div className="profile">
          <ProfileSideBar githubUsername={githubUsername} />
        </div>

        <div style={{ gridArea: 'feed' }}>
          <Box>
            <h1 className="title">
              Bem vindo (a)
            </h1>

            <OrkutNostalgicIconSet />

          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comuidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  value={communityName}
                  onChange={(event) => setCommunityName(event.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  value={communityURL}
                  onChange={(event) => setCommunityURL(event.target.value)}
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div style={{ gridArea: 'comunity' }}>

          {communities.length > 0 && (
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Comunidades - {communities.length}
              </h2>

              <ul>
                {communities.map((community, index) => (
                  <li key={community.title}>
                    <a>
                      <img src={community.image} alt={community.title} />
                      <span>{community.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </ProfileRelationsBoxWrapper>
          )}

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade - {favoritePersons.length}
            </h2>

            <ul>
              {favoritePersons.map((favoritePerson, index) => (
                <li key={favoritePerson + index}>
                  <a href={`/users/${favoritePerson}`}>
                    <img src={`https://github.com/${favoritePerson}.png`} alt={favoritePerson} />
                    <span>{favoritePerson}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

        </div>

      </MainGrid>
    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;


  const response = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      'Authorization': token
    },
  });

  const { isAuthenticated } = await response.json();

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }


  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUsername: githubUser,
    }
  }
}