import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Col, Container, Row} from 'react-grid-system';
import axios from 'axios';
import {useQuery} from "react-query";
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonComponent from "../components/skeleton.component";
import CardComponent from "../components/card.component";

export async function getTabacos() {
    return (await axios.get("http://localhost:1337/api/tabaccos?populate=*")).data;
}

export default function Home() {
    const {data, isError, isLoading} = useQuery('tabacos', getTabacos);
    const amountOfSkeletons = [1,2,3,4,5,6];

    // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering

    return (
    <div>
      <Head>
        <title>Jard.</title>
        <meta name="description" content="Die beste Website der Welt!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>

          <div className={styles.logo}>
              <img src={"/jard.png"} alt="Jard. Company Logo" width={380}/>
          </div>

          <Container>
              <Row>
                  {(isLoading || isError) ?
                      <div>
                          <Row>
                          {
                              Array.from({length: amountOfSkeletons.length})
                                  .map((_, index) => (
                                      // TODO(BUG): Inline styling works, but external styling dont
                                      <Col style={{display: 'flex', justifyContent: 'center'}}>
                                          <SkeletonComponent key={index} />
                                      </Col>
                                      )
                                  )
                          }
                          </Row>
                      </div>
                      :
                        data.data.map(tabaco => (
                            <CardComponent key={tabaco.attributes.name}
                                           type={tabaco.attributes.type}
                                           name={tabaco.attributes.name}
                                           company={tabaco.attributes.company}
                                           price={tabaco.attributes.price}
                                           image={'http://localhost:1337' + tabaco.attributes.image.data.attributes.url}
                            />
                        ))
                    }
              </Row>
          </Container>
      </main>

      <div className={styles.categories}>
          <div className={styles.tag} id={styles.current}>Alles Anzeigen</div>
          <div className={styles.tag}>Darkblend</div>
          <div className={styles.tag}>Virgina</div>
          <div className={styles.tag}>Dampfpaste</div>
          <div className={styles.tag}>Tabakersatz</div>
      </div>

    <div className={styles.placeholder}></div>

    </div>
  )
}
