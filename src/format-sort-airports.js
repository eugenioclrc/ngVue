export default function (data) {
  const results = [];
  data.forEach((e) => {
    const textIcon = (e.type === 'Airport') ?
      '<i class="icon-airplane"></i> ' : '<i class="icon-building"></i> ';

    results.push({
      city: e.city,
      clase: 'airport-option',
      country: e.country,
      id: e.iata,
      ord: e.ord,
      selformat: `${textIcon}${e.name} <b>(${e.iata})</b> <small>${e.country}</small>`,
      text: `${e.name}, ${e.country}`,
      tipo: e.type,
    });
  });

  const cities = {};
  const gresults = [];

  /*
  if (term) {
    results.sort((a, b) => {
      return (a.ord > b.ord);
    });
  }
  */
  results.forEach((r) => {
    const k = `${r.country}-${r.city}`;
    if (!cities[k]) {
      cities[k] = {
        city: r.city,
        country: r.country,
        res: [],
      };
    }
    cities[k].res.push(r);
  });

  const firstCitySort = (a, b) => {
    if (b.tipo === 'City') {
      return 1;
    }
    return -1;
  };

  Object.keys(cities).forEach((i) => {
    if (cities[i].res.length > 1) {
      cities[i].res.sort(firstCitySort);

      cities[i].res.forEach((c) => {
        const clase = (c.tipo === 'City')
        ? 'select2-result-with-children'
        : 'select2-result-children';
        gresults.push(Object.assign(c, { clase }));
      });
    } else {
      cities[i].res[0].clase = 'select2-result-last';
      gresults.push(cities[i].res[0]);
    }
  });
  return gresults;
}
