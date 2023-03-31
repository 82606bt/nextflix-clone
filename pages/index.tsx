import { NextPageContext } from "next";
import { getSession} from "next-auth/react";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMoiveList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if(!session){
    return{
      redirect:{
        destination:'/login',
        permanent: false
      }
    }
  }
  return {
    props:{

    }
  }

}
export default function Home() {
  const  {data: movies =[]} = useMoiveList();
  const {data: favorites = []} = useFavorites();
  const {isOpen, closeModal} = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar/>
      <Billboard/>
      <div className="pb-40">
        <MovieList title="Thịnh hành" data={movies}/>
        <MovieList title="Danh sách yêu thích" data={favorites}/>
      </div>
    </>
  )
}
