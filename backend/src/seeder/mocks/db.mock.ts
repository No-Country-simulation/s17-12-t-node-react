import mongoose, { Types } from 'mongoose';
import { faker } from '@faker-js/faker';

import { Album } from '../../album/schemas';
import { HashAdapter } from '../../common/adapters/hash.adapter';
import { User } from '../../user/entities/user.entity';

export type UserType = User & { _id: Types.ObjectId };

const getUsername = (email: string) => email.split('@')[0];

export const USERS: User[] = Array(5)
  .fill(null)
  .map(() => {
    const hashAdapter = new HashAdapter();
    const password = 'qqqQ22@@';

    const userEmail = faker.internet.email();
    const hashedPassword = hashAdapter.createHash(password, 10);

    return {
      country: faker.location.country(),
      email: userEmail,
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      imageUrl: faker.image.avatarGitHub(),

      isAdmin: faker.datatype.boolean(),
      password: hashedPassword,
      tags: [
        faker.word.words({ count: 1 }),
        faker.word.words({ count: 1 }),
        faker.word.words({ count: 1 }),
      ],
      username: getUsername(userEmail),
      description: faker.lorem.paragraphs(1),
    };
  });

export const ALBUMS: Album[] = Array(10)
  .fill(null)
  .map(() => {
    const userId = new mongoose.Types.ObjectId();

    return {
      location: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
      photos: Array(4)
        .fill(null)
        .map(() => ({ url: faker.image.urlPlaceholder() })),
      description: faker.lorem.paragraphs(1),
      tags: [
        faker.word.words({ count: 1 }),
        faker.word.words({ count: 1 }),
        faker.word.words({ count: 1 }),
      ],
      title: faker.word.words(),
      userId,
    };
  });
