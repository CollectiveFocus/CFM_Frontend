import validator from './address.js';

describe('International Address Validators', () => {
  // Argentina
  test('Argentina validator accepts valid address', async () => {
    const address = {
      street: 'Av. Corrientes 1234',
      city: 'Buenos Aires',
      state: 'CABA',
      zip: '1043',
      geoLat: -34.6037,
      geoLng: -58.3816,
    };
    const isValid = await validator.AR.isValid(address);
    expect(isValid).toBe(true);
  });

  // Australia
  test('Australia validator accepts valid address', async () => {
    const address = {
      street: 'George Street 123',
      suburb: 'Sydney CBD',
      city: 'Sydney',
      state: 'NSW',
      zip: '2000',
      geoLat: -33.8688,
      geoLng: 151.2093,
    };
    const isValid = await validator.AU.isValid(address);
    expect(isValid).toBe(true);
  });

  // Belgium
  test('Belgium validator accepts valid address', async () => {
    const address = {
      street: 'Grand Place 1',
      city: 'Brussels',
      zip: '1000',
      geoLat: 50.8503,
      geoLng: 4.3517,
    };
    const isValid = await validator.BE.isValid(address);
    expect(isValid).toBe(true);
  });

  // Brazil
  test('Brazil validator accepts valid address', async () => {
    const address = {
      street: 'Avenida Paulista 1000',
      district: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zip: '01310-100',
      geoLat: -23.5505,
      geoLng: -46.6333,
    };
    const isValid = await validator.BR.isValid(address);
    expect(isValid).toBe(true);
  });

  // Canada
  test('Canada validator accepts valid address', async () => {
    const address = {
      street: 'Yonge Street 1',
      city: 'Toronto',
      province: 'ON',
      zip: 'M5E 1E5',
      geoLat: 43.6532,
      geoLng: -79.3832,
    };
    const isValid = await validator.CA.isValid(address);
    expect(isValid).toBe(true);
  });

  // Switzerland
  test('Switzerland validator accepts valid address', async () => {
    const address = {
      name: ' Anna Müller ',
      street: 'Bahnhofstrasse 1 ',
      zip: '8001',
      city: ' Zürich ',
      canton: 'ZH',
      geoLat: 47.3769,
      geoLng: 8.5417,
    };
    const isValid = await validator.CH.isValid(address);
    expect(isValid).toBe(true);
  });

  // China
  test('China validator accepts valid address', async () => {
    const address = {
      province: 'Beijing',
      city: 'Beijing',
      district: 'Dongcheng',
      street: 'Wangfujing Street',
      zip: '100006',
      geoLat: 39.9042,
      geoLng: 116.4074,
    };
    const isValid = await validator.CN.isValid(address);
    expect(isValid).toBe(true);
  });

  // Colombia
  test('Colombia validator accepts valid address', async () => {
    const address = {
      street: 'Carrera 7 #71-52',
      city: 'Bogotá',
      department: 'Cundinamarca',
      zip: '110321',
      geoLat: 4.711,
      geoLng: -74.0721,
    };
    const isValid = await validator.CO.isValid(address);
    expect(isValid).toBe(true);
  });

  // Denmark
  test('Denmark validator accepts valid address', async () => {
    const address = {
      street: 'Strøget 1',
      city: 'Copenhagen',
      zip: '1001',
      geoLat: 55.6761,
      geoLng: 12.5683,
    };
    const isValid = await validator.DK.isValid(address);
    expect(isValid).toBe(true);
  });

  // Egypt
  test('Egypt validator accepts valid address', async () => {
    const address = {
      district: 'Downtown',
      city: 'Cairo',
      governorate: 'Cairo',
      zip: '11511',
      geoLat: 30.0444,
      geoLng: 31.2357,
    };
    const isValid = await validator.EG.isValid(address);
    expect(isValid).toBe(true);
  });

  // France
  test('France validator accepts valid address', async () => {
    const address = {
      street: 'Champs-Élysées 1',
      city: 'Paris',
      zip: '75008',
      geoLat: 48.8566,
      geoLng: 2.3522,
    };
    const isValid = await validator.FR.isValid(address);
    expect(isValid).toBe(true);
  });

  // Germany
  test('Germany validator accepts valid address', async () => {
    const address = {
      street: 'Unter den Linden 1',
      city: 'Berlin',
      zip: '10117',
      geoLat: 52.52,
      geoLng: 13.405,
    };
    const isValid = await validator.DE.isValid(address);
    expect(isValid).toBe(true);
  });

  // Iceland
  test('Iceland validator accepts valid address', async () => {
    const address = {
      street: 'Laugavegur 1',
      city: 'Reykjavik',
      zip: '101',
      geoLat: 64.1265,
      geoLng: -21.8174,
    };
    const isValid = await validator.IS.isValid(address);
    expect(isValid).toBe(true);
  });

  // India
  test('India validator accepts valid address', async () => {
    const address = {
      street: 'Connaught Place',
      area: 'Central Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      zip: '110001',
      geoLat: 28.6139,
      geoLng: 77.209,
    };
    const isValid = await validator.IN.isValid(address);
    expect(isValid).toBe(true);
  });

  // Israel
  test('Israel validator accepts valid address', async () => {
    const address = {
      street: 'Rothschild Blvd 1',
      city: 'Tel Aviv',
      zip: '6688101',
      geoLat: 32.0853,
      geoLng: 34.7818,
    };
    const isValid = await validator.IL.isValid(address);
    expect(isValid).toBe(true);
  });

  // Italy
  test('Italy validator accepts valid address', async () => {
    const address = {
      name: ' Mario Rossi ',
      street: 'Via Nazionale 10 ',
      zip: '00184',
      city: ' Roma ',
      state: 'RM',
      geoLat: 41.9028,
      geoLng: 12.4964,
    };
    const isValid = await validator.IT.isValid(address);
    expect(isValid).toBe(true);
  });

  // Japan
  test('Japan validator accepts valid address', async () => {
    const address = {
      zip: '100-0001',
      prefecture: 'Tokyo',
      city: 'Chiyoda',
      district: 'Marunouchi',
      street: '1-1-1',
      geoLat: 35.6762,
      geoLng: 139.6503,
    };
    const isValid = await validator.JP.isValid(address);
    expect(isValid).toBe(true);
  });

  // Lebanon
  test('Lebanon validator accepts valid address', async () => {
    const address = {
      district: 'Downtown',
      city: 'Beirut',
      zip: '1100',
      geoLat: 33.8938,
      geoLng: 35.5018,
    };
    const isValid = await validator.LB.isValid(address);
    expect(isValid).toBe(true);
  });

  // Lithuania
  test('Lithuania validator accepts valid address', async () => {
    const address = {
      street: 'Gedimino pr. 1',
      city: 'Vilnius',
      zip: 'LT-01103',
      geoLat: 54.6872,
      geoLng: 25.2797,
    };
    const isValid = await validator.LT.isValid(address);
    expect(isValid).toBe(true);
  });

  // New Zealand
  test('New Zealand validator accepts valid address', async () => {
    const address = {
      street: 'Queen Street 1',
      suburb: 'Auckland CBD',
      city: 'Auckland',
      zip: '1010',
      geoLat: -36.8485,
      geoLng: 174.7633,
    };
    const isValid = await validator.NZ.isValid(address);
    expect(isValid).toBe(true);
  });

  // Saudi Arabia
  test('Saudi Arabia validator accepts valid address', async () => {
    const address = {
      district: 'Al Olaya',
      city: 'Riyadh',
      zip: '12213',
      geoLat: 24.7136,
      geoLng: 46.6753,
    };
    const isValid = await validator.SA.isValid(address);
    expect(isValid).toBe(true);
  });

  // Singapore
  test('Singapore validator accepts valid address', async () => {
    const address = {
      block: '1',
      street: 'Raffles Place',
      unit: '#01-00',
      zip: '048616',
      geoLat: 1.284,
      geoLng: 103.8514,
    };
    const isValid = await validator.SG.isValid(address);
    expect(isValid).toBe(true);
  });

  // Slovakia
  test('Slovakia validator accepts valid address', async () => {
    const address = {
      street: 'Hlavné námestie 1',
      city: 'Bratislava',
      zip: '811 01',
      geoLat: 48.1486,
      geoLng: 17.1077,
    };
    const isValid = await validator.SK.isValid(address);
    expect(isValid).toBe(true);
  });

  // Thailand
  test('Thailand validator accepts valid address', async () => {
    const address = {
      street: 'Silom Road',
      subdistrict: 'Silom',
      district: 'Bang Rak',
      province: 'Bangkok',
      zip: '10500',
      geoLat: 13.7246,
      geoLng: 100.5232,
    };
    const isValid = await validator.TH.isValid(address);
    expect(isValid).toBe(true);
  });

  // Netherlands
  test('Netherlands validator accepts valid address', async () => {
    const address = {
      street: 'Dam 1',
      city: 'Amsterdam',
      zip: '1012 JS',
      geoLat: 52.3676,
      geoLng: 4.9041,
    };
    const isValid = await validator.NL.isValid(address);
    expect(isValid).toBe(true);
  });

  // United Kingdom
  test('United Kingdom validator accepts valid address', async () => {
    const address = {
      street: 'Downing Street 10',
      locality: 'Westminster',
      city: 'London',
      zip: 'SW1A 2AA',
      geoLat: 51.5074,
      geoLng: -0.1278,
    };
    const isValid = await validator.GB.isValid(address);
    expect(isValid).toBe(true);
  });

  // USA
  test('USA validator accepts valid address', async () => {
    const address = {
      street: 'Pennsylvania Avenue 1600',
      city: 'Washington',
      state: 'DC',
      zip: '20500',
      geoLat: 38.8977,
      geoLng: -77.0365,
    };
    const isValid = await validator.US.isValid(address);
    expect(isValid).toBe(true);
  });

  // Vietnam
  test('Vietnam validator accepts valid address', async () => {
    const address = {
      street: '123 Đường Lê Lợi',
      ward: 'Phường Bến Nghé',
      city: 'Hồ Chí Minh',
      zip: '700000',
      geoLat: 10.773,
      geoLng: 106.704,
    };

    const isValid = await validator.VN.isValid(address);
    expect(isValid).toBe(true);
  });
});

describe('Invalid Address Validation', () => {
  test('Rejects invalid postal codes', async () => {
    const invalidAddresses = [
      { validator: validator.AR, address: { zip: '123' } }, // Argentina - too short
      { validator: validator.CA, address: { zip: '12345' } }, // Canada - wrong format
      { validator: validator.JP, address: { zip: '1234567' } }, // Japan - missing dash
      { validator: validator.NL, address: { zip: '1234AB' } }, // Netherlands - missing space
    ];

    for (const { validator, address } of invalidAddresses) {
      await expect(
        validator.validate({
          ...address,
          street: 'Test',
          city: 'Test',
          geoLat: 0,
          geoLng: 0,
        })
      ).rejects.toThrow();
    }
  });

  test('Rejects missing required fields', async () => {
    const baseAddress = {
      street: 'Test',
      city: 'Test',
      zip: '12345',
      geoLat: 0,
      geoLng: 0,
    };

    await expect(
      validator.BR.validate({ ...baseAddress, state: undefined })
    ).rejects.toThrow();
    await expect(
      validator.IN.validate({ ...baseAddress, state: undefined })
    ).rejects.toThrow();
    await expect(
      validator.TH.validate({ ...baseAddress, province: undefined })
    ).rejects.toThrow();
  });
});

describe('Edge Cases', () => {
  test('Optional fields are truly optional', async () => {
    // Test that optional fields like locality in UK don't cause validation to fail
    const ukAddressWithoutLocality = {
      street: 'Test Street',
      city: 'London',
      zip: 'SW1A 1AA',
      geoLat: 51.5074,
      geoLng: -0.1278,
    };

    const isValid = await validator.GB.isValid(ukAddressWithoutLocality);
    expect(isValid).toBe(true);
  });
});
