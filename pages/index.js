import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Col, Container, Row} from 'react-grid-system';
import axios from 'axios';
import {useQuery} from "react-query";
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonComponent from "../components/skeleton.component";
import CardComponent from "../components/card.component";

export async function getTobacco() {
    return (await axios.get("https://jard.panel.jade-hookah.shop/tobaccos")).data;
}

export default function Home() {
    const {data, isError, isLoading} = useQuery('tobaccos', getTobacco);
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
                                      // eslint-disable-next-line react/jsx-key
                                      <Col style={{display: 'flex', justifyContent: 'center'}}>
                                          <SkeletonComponent key={index} />
                                      </Col>
                                      )
                                  )
                          }
                          </Row>
                      </div>
                      :
                        data.data.map(tobacco => (
                            <CardComponent key={tobacco.attributes.name}
                                           type={tobacco.attributes.type}
                                           name={tobacco.attributes.name}
                                           company={tobacco.attributes.company}
                                           price={tobacco.attributes.price}
                                           image={'https://jard.panel.jade-hookah.shop/' + tobacco.attributes.image.data.attributes.url}
                            />
                        ))
                    }
              </Row>
          </Container>
      </main>

      {/* TODO: Readout the strapi categories instead of incode */}
      <div className={styles.categories}>
          <div className={styles.tag} id={styles.current}>Alles Anzeigen</div>
          <div className={styles.tag}>Darkblend</div>
          <div className={styles.tag}>Virginia</div>
          <div className={styles.tag}>Dampfpaste</div>
          <div className={styles.tag}>Tabakersatz</div>
      </div>

    <div className={styles.placeholder}></div>

    </div>
  )
}
