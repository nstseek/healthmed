import puppeteer from 'puppeteer';

describe('E2E tests', () => {
  jest.setTimeout(600000);

  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = (await browser.pages())[0];
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should render', async () => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
    expect((await page.$$('.App')).length).toEqual(1);
  });

  it('should render zero patients', async () => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
    expect((await page.$$('.CardPaciente')).length).toEqual(0);
  });

  it('should render the form', async () => {
    expect((await page.$$('.Cadastro .Form')).length).toEqual(1);
    expect((await page.$$('.Cadastro .Form .row')).length).toEqual(6);
    expect((await page.$$('.Cadastro .buttons')).length).toEqual(1);
  });

  // deve renderizar o botao de apagar todos os dados só quando tivermos dados

  // deve alterar o status ao clicar no botao do paciente

  // deve renderizar os botoes e as infos do card

  // deve ter barra de pesquisa funcional

  // deve preencher o form com os dados do card

  //   it('should add a patient and show it on the list', async () => {});
});
