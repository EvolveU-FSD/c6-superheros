const db = require('../models/dbMongo')

const SuperheroHome = require('../models/SuperheroMongo')

function fail(reason) {
    throw new Error(reason)
}

describe('SuperheroHome', () => {

    afterAll(async () => {
        return db.close()
    })

    beforeEach(async () => {
        return SuperheroHome.deleteAll()
    })

    it('findAll should find nothing in an empty database', async () => {
        // setup

        // act
        let actualHeros = await SuperheroHome.findAll()

        // assert
        expect(Array.isArray(actualHeros)).toBeTruthy
        expect(actualHeros.length).toBe(0)   
    }, 10000)

    it('create should create a superhero', async () => {
        //setup
        let expectedSuperhero = {
            name: "Ironman",
            alterego: "Tony Stark"
        }

        //act
        const actualSuperhero = await SuperheroHome.create(expectedSuperhero)

        // assert
        expect(actualSuperhero.name).toBe(expectedSuperhero.name)
        expect(actualSuperhero.alterego).toBe(expectedSuperhero.alterego)
        expect(actualSuperhero.nickname).toBe(undefined)
        expect(actualSuperhero.sidekick).toBe(undefined)
        expect(actualSuperhero._id).not.toBe(undefined)
    })

    it('findAll should find a created record', async () => {
        //setup
        let expectedSuperhero = {
            name: "Ironman",
            alterego: "Tony Stark"
        }
        await SuperheroHome.create(expectedSuperhero)

        //act
        let actualSuperheros = await SuperheroHome.findAll()

        // assert
        expect(actualSuperheros.length).toBe(1)
        let actualSuperhero = actualSuperheros[0]

        expect(actualSuperhero.name).toBe(expectedSuperhero.name)
        expect(actualSuperhero.alterego).toBe(expectedSuperhero.alterego)
        expect(actualSuperhero.nickname).toBe(undefined)
        expect(actualSuperhero.sidekick).toBe(undefined)
        expect(actualSuperhero._id).not.toBe(undefined)
    })

    it('findById should find a created record', async () => {
        //setup
        let expectedSuperhero = {
            name: "Ironman",
            alterego: "Tony Stark"
        }
        let createdSuperhero = await SuperheroHome.create(expectedSuperhero)

        //act
        let actualSuperhero = await SuperheroHome.findById(createdSuperhero._id)

        // assert
        expect(actualSuperhero.name).toBe(expectedSuperhero.name)
        expect(actualSuperhero.alterego).toBe(expectedSuperhero.alterego)
        expect(actualSuperhero.nickname).toBe(undefined)
        expect(actualSuperhero.sidekick).toBe(undefined)
        expect(actualSuperhero._id).not.toBe(undefined)
    })

    it('findById should fail if the superhero does not exist', async () => {
        //setup

        //act
        let actualSuperhero = await SuperheroHome.findById("60e5e3e0aff432423a66a9b4")

        // assert
        expect(actualSuperhero).toBe(null)
    })

    it('create should require a name', async () => {
        //setup
        let expectedSuperhero = {
            name: undefined,
            alterego: "Tony Stark"
        }
 
        //verify
        try {
            await SuperheroHome.create(expectedSuperhero)
            fail('Create should fail when trying to clear a name');
        }
        catch (err) {
            // happy case
        }
    })

    it('create should error if superhero already exists', async () => {
        //setup
        let expectedSuperhero = {
            name: "Ironman",
            alterego: "Tony Stark"
        }
        await SuperheroHome.create(expectedSuperhero)

        try {
            await SuperheroHome.create(expectedSuperhero)
            fail('Create should not complete normally when creating a superhero with the same name as another in the database')
        }
        catch (err) {
            /// happy case!
        }
    })

    it('update should change some values', async () => {
        //setup
        let expectedSuperhero = {
            name: "Ironman",
            alterego: "Tony Stark"
        }
        const createdSuperhero = await SuperheroHome.create(expectedSuperhero)

        // act
        await SuperheroHome.update(createdSuperhero._id, {
            _id: createdSuperhero._id,
            name: 'ir0nm@n',
            alterego: 'Stark Tony'
        })

        // assert
        let actualSuperhero = await SuperheroHome.findById(createdSuperhero._id)
        expect(actualSuperhero.name).toBe('ir0nm@n')
        expect(actualSuperhero.alterego).toBe('Stark Tony')
        expect(actualSuperhero.nickname).toBe(undefined)
        expect(actualSuperhero.sidekick).toBe(undefined)
    })

    it('update should can unset a value', async () => {
        //setup
        let expectedSuperhero = {
            name: "Ironman",
            alterego: "Tony Stark"
        }
        const createdSuperhero = await SuperheroHome.create(expectedSuperhero)

        // act
        await SuperheroHome.update(createdSuperhero._id, {
            _id: createdSuperhero._id,
            name: 'ir0nm@n',
            alterego: null
        })

        // assert
        let actualSuperhero = await SuperheroHome.findById(createdSuperhero._id)
        expect(actualSuperhero.name).toBe('ir0nm@n')
        expect(actualSuperhero.alterego).toBe(null)
        expect(actualSuperhero.nickname).toBe(undefined)
        expect(actualSuperhero.sidekick).toBe(undefined)
    })

    it('update should require a name', async () => {
        //setup
        let expectedSuperhero = {
            name: "Ironman",
            alterego: "Tony Stark"
        }
        const createdSuperhero = await SuperheroHome.create(expectedSuperhero)

        // verify
        try {
            await SuperheroHome.update(createdSuperhero._id, {
                _id: createdSuperhero._id,
                name: undefined,
            })    
            fail('Update should not complete normally when clearing a name')
        }
        catch (error) {
            // happy case!
        }
    })

    it('update should error if name is being changed to one that already exists', async () => {
        //setup
        let existingSuperhero = {
            name: "Ironman",
            alterego: "Tony Stark"
        }
        await SuperheroHome.create(existingSuperhero)
        let newSuperhero = {
            name: "War Machine",
            alterego: "Col. Barker"
        }
        const createdSuperhero = await SuperheroHome.create(newSuperhero)

        // verify
        try {
            await SuperheroHome.update(createdSuperhero._id, {
                _id: createdSuperhero._id,
                name: "Ironman",
            })    
            fail('Update should not complete normally when trying to set a duplicate name')
        }
        catch (error) {
            // happy case!
        }
    })

    it ('delete should get rid of a superhero', async () => {
        //setup
        let expectedSuperhero = {
            name: "Ironman",
            alterego: "Tony Stark"
        }
        let createdSuperhero = await SuperheroHome.create(expectedSuperhero)

        //act
        await SuperheroHome.deleteSuperhero(createdSuperhero._id)

        // assert
        let actualSuperhero = await SuperheroHome.findById(createdSuperhero._id)
        expect(actualSuperhero).toBe(null)
    })

    it ('delete should fail if the superhero does not exist', async () => {

        //verify
        try {
            await SuperheroHome.deleteSuperhero("60e5e3e0aff432423a66a9b4")
            fail('Delete should fail when the superhero id does not exist')
        }
        catch (err) {
            // no problem!
        }

    })


})