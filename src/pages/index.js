import { OrkutMenu } from '../lib/OrkutCommons';
import Box from '../components/Box';

import MainGrid from '../components/MainGrid';

function ProfileSideBar() {
  return (
    <div className="profile" style={{ gridArea: 'profile' }}>
      <Box><img src="https://avatars.githubusercontent.com/u/43768058?v=4" /></Box>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <OrkutMenu />
      <MainGrid>

        <ProfileSideBar />

        <div style={{ gridArea: 'feed' }}>
          <Box>Bem vindo</Box>
        </div>

        <div style={{ gridArea: 'comunity' }}>
          <Box>Lista amigos</Box>
          <Box>Comunidades</Box>
        </div>

      </MainGrid>
    </>
  )
}
