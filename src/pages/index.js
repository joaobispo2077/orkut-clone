import { OrkutMenu, OrkutNostalgicIconSet } from '../lib/OrkutCommons';
import Box from '../components/Box';

import MainGrid from '../components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations';

function ProfileSideBar({ githubUsername }) {
  return (
    <div className="profile" style={{ gridArea: 'profile' }}>
      <Box><img src={`https://github.com/${githubUsername}.png`} /></Box>
    </div>
  )
}

export default function Home() {
  const githubUsername = 'joaobispo2077';
  const favoritePersons = [
    'Viviane-Queiroz',
    'Viviane-Queiroz',
    'Viviane-Queiroz',
    'Viviane-Queiroz',
    'Viviane-Queiroz',
    'Viviane-Queiroz'
  ];

  return (
    <>
      <OrkutMenu />
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
        </div>

        <div style={{ gridArea: 'comunity' }}>
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
          {/* <Box>Comunidades</Box> */}
        </div>

      </MainGrid>
    </>
  )
}
