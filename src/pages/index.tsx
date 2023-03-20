import { Suspense, useCallback, useState, useTransition } from "react";
import AppBar from "@components/appBar";
import useUpdateEffect from "hooks/useUpdateEffect";
import { riotPlatform } from "lib/constant";
import Main from "@components/main";
import List from "@components/list";


export default function Home() {
  const [_isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [platform, setPlatform] = useState(riotPlatform.BR1.name);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useUpdateEffect(() => {
    if(!searchTerm || searchTerm === '') return
    fetch("/api/match-history", {
      method: "POST",
      headers:{
        "Content-Type":'application/json'
      },
      body: JSON.stringify({
        searchTerm: searchTerm,
        platform: platform
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.items);
        if(result.error){
          console.log(result)
          setErrorMessage(result.error)
        }
      });
      return () => {

      }
  }, [searchTerm,platform]);

  const onSubmitSearchTerm = useCallback((searchTerm: string) => {
    startTransition(() => {
      setSearchTerm(searchTerm);
    });
  }, []);
  const onPlatformChange = useCallback((newPlatform: string) => {
    startTransition(() => {
      setPlatform(newPlatform);
    });
  }, []);
  
  return (
    <Suspense fallback={<h1>🌀 Loading...</h1>}>
      <AppBar onSearch={onSubmitSearchTerm}  onPlatformChange={onPlatformChange}/>
      <Main>
        <List items={data} searchTerm={searchTerm} errorMessage={errorMessage} />
      </Main>
    </Suspense>
  );
}
