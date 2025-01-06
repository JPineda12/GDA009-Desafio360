-- use xd;
--  DROP DATABASE GDA009_OT_Juan_Pineda; CREATE DATABASE GDA009_OT_Juan_Pineda;

USE GDA009_OT_Juan_Pineda;
/********************************************************************************
*****																			*
*****				CREACION DE TABLAS Y RELACIONES								*
*****																			*
*********************************************************************************/

create table Rol(
id int identity(1,1) not null,
nombre varchar(50) not null UNIQUE,
fecha_creacion datetime not null,

constraint PK_Rol primary key (id)
);

create table Estado(
id int identity(1,1) not null,
nombre varchar(50) not null UNIQUE,
fecha_creacion datetime not null,

constraint PK_Estado primary key (id)
);


create table Usuario(
id int identity(1,1) not null,
rol_idRol int not null,
estado_idEstado int not null,
correo_electronico varchar(50) not null UNIQUE,
nombre_completo nvarchar(90) not null,
password varchar(512) not null,
telefono varchar(20),
razon_social varchar(245),
nombre_comercial nvarchar(100),
direccion_entrega nvarchar(200),
fecha_nacimiento date not null,
fecha_creacion datetime not null,
fecha_modificacion datetime not null,
fecha_eliminacion datetime,
constraint PK_Usuario primary key (id),
constraint FK_Usuario_Rol foreign key (rol_idRol) references Rol(id),
constraint FK_Usuario_Estado foreign key (estado_idEstado) references Estado(id),
);

create table Categoria_Producto(
id int identity(1,1) not null,
usuario_idUsuario int not null,
nombre varchar(45) not null UNIQUE,
estado_idEstado int not null,
fecha_creacion datetime not null,
fecha_modificacion datetime not null,
fecha_eliminacion datetime

constraint PK_CategoriaProducto primary key (id),
constraint FK_CategoriaProducto_Usuario foreign key (usuario_idUsuario) references Usuario(id),
constraint FK_CategoriaProducto_Estado foreign key (estado_idEstado) references Estado(id)
);

create table Orden(
id int identity(1,1) not null,
usuario_idUsuario int not null,
estado_idEstado int not null,
nombre_completo nvarchar(90) not null,
direccion nvarchar(200) not null,
telefono varchar(20) not null,
correo_electronico varchar(50) not null,
fecha_entrega date,
total_orden float not null,
fecha_creacion datetime not null,
fecha_modificacion datetime not null,
constraint PK_Orden primary key (id),
constraint FK_Orden_Usuario foreign key (usuario_idUsuario) references Usuario(id),
constraint FK_Orden_Estado foreign key (estado_idEstado) references Estado(id)
);

create table Producto(
id int identity(1,1) not null,
Categoria_Producto_idCategoriaProducto int not null,
usuario_idUsuario int not null,
nombre nvarchar(90) not null ,
marca nvarchar(45) not null,
codigo varchar(45) not null,
stock int not null,
estado_idEstado int not null,
precio float not null,
imagen_url varchar(500) not null,
fecha_creacion datetime not null,
fecha_modificacion datetime not null,
fecha_eliminacion datetime,

constraint PK_Producto primary key (id),
constraint FK_Producto_CategoriaProducto foreign key (Categoria_Producto_idCategoriaProducto) references Categoria_Producto(id),
constraint FK_Producto_Usuario foreign key (usuario_idUsuario) references Usuario(id),
constraint FK_Producto_Estado foreign key (estado_idEstado) references Estado(id),
);


create table Orden_Detalle(
id int identity(1,1) not null,
Orden_idOrden int not null,
Producto_idProducto int not null,
cantidad int not null,
precio float not null,
subtotal float not null,
fecha_creacion datetime not null,
fecha_modificacion datetime not null
constraint PK_OrdenDetalle primary key (id),
constraint FK_OrdenDetalle_Orden foreign key (Orden_idOrden) references Orden(id),
constraint FK_OrdenDetalle_Producto foreign key (Producto_idProducto) references Producto(id)
);
GO

/********************************************************************************
*****																			*
*****				CREACION DE PROCEDIMIENTOS ALMACENADOS						*
*****																			*
*********************************************************************************/


-- PROCEDIMIENTOS DE ROL
CREATE PROCEDURE crear_rol
(
    @nombre varchar(50)
)
AS
BEGIN
	INSERT INTO Rol(nombre, fecha_creacion)
	VALUES (@nombre, GETDATE())
END
GO
----------------------------------------------------------------------------------------------

-- PROCEDIMIENTOS DE ESTADO
CREATE PROCEDURE crear_estado
(
    @nombre varchar(50)
)
AS
BEGIN

	INSERT INTO Estado(nombre, fecha_creacion)
	VALUES (@nombre, GETDATE())
END
GO
----------------------------------------------------------------------------------------------

-- PROCEDIMIENTOS DE USUARIO
CREATE PROCEDURE crear_usuario
(
    @correo_electronico varchar(50),
    @nombre_completo nvarchar(90),
	@password nvarchar(512),
	@fecha_nacimiento date,
	@idRol int,
	@idEstado int,
	@telefono varchar(20) = null,
	@razon_social varchar(245) = null,
	@nombre_comercial nvarchar(100) = null,
	@direccion_entrega nvarchar(200) = null
)
AS
BEGIN
    BEGIN TRY
	    BEGIN TRANSACTION;
		IF EXISTS (SELECT 1 FROM Usuario WHERE correo_electronico = @correo_electronico)
		BEGIN
			RAISERROR('El correo electrónico ya está registrado.', 16, 1);
			RETURN;
		END

		IF NOT EXISTS (SELECT 1 FROM Rol WHERE id = @idRol)
		BEGIN
			RAISERROR('El Rol especificado no existe.', 16, 1);
			RETURN;
		END

		IF NOT EXISTS (SELECT 1 FROM Estado WHERE id = @idEstado)
		BEGIN
			RAISERROR('El Estado especificado no existe.', 16, 1);
			RETURN;
		END

		INSERT INTO Usuario(correo_electronico, nombre_completo,  password, fecha_nacimiento, rol_idRol, estado_idEstado, telefono, 
		razon_social, nombre_comercial, direccion_entrega, fecha_creacion, fecha_modificacion)
		VALUES (@correo_electronico,  @nombre_completo, @password, @fecha_nacimiento, @idRol, @idEstado, @telefono, 
		@razon_social, @nombre_comercial, @direccion_entrega, GETDATE(), GETDATE())

		-- RETORNAR INFORMACION DEL REGISTRO RECIEN INSERTADO
		DECLARE @newIdUsuario INT = SCOPE_IDENTITY();

		 COMMIT TRANSACTION;


		-- Return la informacion del usuario recien insertado
		SELECT 
			A.id,
			A.correo_electronico,
			A.nombre_completo,
			A.fecha_nacimiento,
			A.rol_idRol as idRol,
			C.nombre as rol,
			A.estado_idEstado as idEstado,
			B.nombre as estado,
			A.telefono,
			A.razon_social,
			A.nombre_comercial,
			A.direccion_entrega,
			A.fecha_creacion,
			A.fecha_modificacion
		FROM Usuario A, Estado B, Rol C
		WHERE A.id =  @newIdUsuario
		AND A.estado_idEstado = B.id
		AND A.rol_idRol = C.id
	END TRY
    BEGIN CATCH
        -- Rollback in case of error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Return error details
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (
            'Ocurrio un error creando el usuario en la base de datos: %s', 
            @ErrorSeverity, @ErrorState, @ErrorMessage
        );
    END CATCH
END
GO

CREATE PROCEDURE editar_usuario
(
	@idUsuario int,
    @correo_electronico varchar(50),
    @nombre_completo nvarchar(90),
	@password nvarchar(512) = null,
	@fecha_nacimiento date,
	@idRol int,
	@idEstado int,
	@telefono varchar(20) = null,
	@razon_social varchar(245) = null,
	@nombre_comercial nvarchar(100) = null,
	@direccion_entrega nvarchar(200) = null
)
AS
BEGIN
    BEGIN TRY
	    BEGIN TRANSACTION;
    IF NOT EXISTS (SELECT 1 FROM Usuario WHERE id = @idUsuario)
    BEGIN
        RAISERROR('El usuario con el id especificado no existe.', 16, 1);
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM Usuario WHERE correo_electronico = @correo_electronico AND id <> @idUsuario)
    BEGIN
        RAISERROR('El correo electrónico ya está registrado.', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Rol WHERE id = @idRol)
    BEGIN
        RAISERROR('El Rol especificado no existe.', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Estado WHERE id = @idEstado)
    BEGIN
        RAISERROR('El Estado especificado no existe.', 16, 1);
        RETURN;
    END


	UPDATE USUARIO
	SET correo_electronico = @correo_electronico, 
		nombre_completo = @nombre_completo, 
		password = @password, 
		fecha_nacimiento = @fecha_nacimiento, 
		Rol_idRol = @idRol, 
		Estado_idEstado = @idEstado,
		telefono = @telefono,
		razon_social = @razon_social,
		nombre_comercial = @nombre_comercial,
		direccion_entrega = @direccion_entrega,
		fecha_modificacion = GETDATE()
	WHERE id = @idUsuario;


		 COMMIT TRANSACTION;
		-- Return la informacion del usuario recien actualizado
		-- Return la informacion del usuario recien insertado
		SELECT 
			A.id,
			A.correo_electronico,
			A.nombre_completo,
			A.fecha_nacimiento,
			A.rol_idRol as idRol,
			C.nombre as rol,
			A.estado_idEstado as idEstado,
			B.nombre as estado,
			A.telefono,
			A.razon_social,
			A.nombre_comercial,
			A.direccion_entrega,
			A.fecha_creacion,
			A.fecha_modificacion
		FROM Usuario A, Estado B, Rol C
		WHERE A.id =  @idUsuario
		AND A.estado_idEstado = B.id
		AND A.rol_idRol = C.id
	END TRY
    BEGIN CATCH
        -- Rollback in case of error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Return error details
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (
            'Ocurrio un error actualizando el usuario en la base de datos: %s', 
            @ErrorSeverity, @ErrorState, @ErrorMessage
        );
    END CATCH
END
GO

CREATE PROCEDURE eliminar_usuario
(
	@idUsuario INT
)
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT 1 FROM Usuario WHERE id = @idUsuario)
		BEGIN
			RAISERROR('El usuario con el id especificado no existe.', 16, 1);
			RETURN;
		END
		
		DECLARE @idEstado INT;

			SELECT @idEstado = id
			FROM Estado
			WHERE LOWER(nombre) = 'eliminado';

			IF @idEstado IS NULL
			BEGIN
				RAISERROR('No existe el estado "eliminado" en la tabla Estado.', 16, 1);
				RETURN;
			END
	BEGIN TRANSACTION;
	UPDATE Usuario
	SET estado_idEstado = @idEstado,
		fecha_eliminacion = GETDATE()
	WHERE id = @idUsuario

	COMMIT TRANSACTION;
	END TRY
    BEGIN CATCH
        -- Rollback in case of error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Return error details
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (
            'Ocurrio un error eliminando el usuario en la base de datos: %s', 
            @ErrorSeverity, @ErrorState, @ErrorMessage
        );
    END CATCH
END

----------------------------------------------------------------------------------------------

-- PROCEDIMIENTOS DE CATEGORIA PRODUCTO
GO
CREATE PROCEDURE crear_categoria_producto
(
    @idUsuario int,
    @nombre VARCHAR(45),
	@idEstado int
)
AS
BEGIN
	BEGIN TRY
    IF NOT EXISTS (SELECT 1 FROM Usuario WHERE id = @idUsuario)
    BEGIN
        RAISERROR('El usuario no existe.', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Estado WHERE id = @idEstado)
    BEGIN
        RAISERROR('El Estado especificado no existe.', 16, 1);
        RETURN;
    END
	BEGIN TRANSACTION;
	INSERT INTO Categoria_Producto(usuario_idUsuario, nombre, estado_idEstado, fecha_creacion, fecha_modificacion)
	VALUES(@idUsuario, @nombre, @idEstado, GETDATE(), GETDATE());
	
	DECLARE @newIdCategoria INT = SCOPE_IDENTITY();

	COMMIT TRANSACTION;
		-- Return la informacion de la categoria recien insertada
		SELECT A.id, A.nombre, E.id as idEstado, E.nombre as estado, A.fecha_creacion, A.fecha_modificacion, B.nombre_completo as usuario_creador
		FROM Categoria_Producto A, Usuario B, Estado E
		WHERE A.id =  @newIdCategoria
		AND A.usuario_idUsuario = B.id
		AND A.estado_idEstado = E.id
	END TRY
    BEGIN CATCH
        -- Rollback in case of error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Return error details
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (
            'Ocurrio un error creando la categoria en la base de datos: %s', 
            @ErrorSeverity, @ErrorState, @ErrorMessage
        );
    END CATCH
END
GO

CREATE PROCEDURE editar_categoria_producto
(
	@idCategoria int,
    @idUsuario int,
    @nombre VARCHAR(45),
	@idEstado int
)
AS
BEGIN
	BEGIN TRY
    IF NOT EXISTS (SELECT 1 FROM Categoria_Producto WHERE id = @idCategoria)
    BEGIN
        RAISERROR('La categoria con el id especificado no existe.', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Usuario WHERE id = @idUsuario)
    BEGIN
        RAISERROR('El usuario no existe.', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Estado WHERE id = @idEstado)
    BEGIN
        RAISERROR('El Estado especificado no existe.', 16, 1);
        RETURN;
    END
	BEGIN TRANSACTION;
	UPDATE Categoria_Producto
	SET estado_idEstado = @idEstado, nombre = @nombre, usuario_idUsuario = @idUsuario, 
		fecha_modificacion = GETDATE()
	WHERE id = @idCategoria

		 COMMIT TRANSACTION;


		-- Return la informacion de la categoria recien actualizada
		SELECT A.id, A.nombre, E.id as idEstado, E.nombre as estado, A.fecha_creacion, A.fecha_modificacion, B.nombre_completo as usuario_creador
		FROM Categoria_Producto A, Usuario B, Estado E
		WHERE A.id =   @idCategoria
		AND A.usuario_idUsuario = B.id
		AND A.estado_idEstado = E.id
	END TRY
    BEGIN CATCH
        -- Rollback in case of error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Return error details
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (
            'Ocurrio un error actualizando la categoria en la base de datos: %s', 
            @ErrorSeverity, @ErrorState, @ErrorMessage
        );
    END CATCH

END
GO

CREATE PROCEDURE eliminar_categoria_producto
(
	@idCategoria int
)
AS
BEGIN
	BEGIN TRY
    IF NOT EXISTS (SELECT 1 FROM Categoria_Producto WHERE id = @idCategoria)
    BEGIN
        RAISERROR('La categoria con el id especificado no existe.', 16, 1);
        RETURN;
    END

		DECLARE @idEstadoEliminado INT;

			SELECT @idEstadoEliminado = id
			FROM Estado
			WHERE LOWER(nombre) = 'eliminado';

			IF @idEstadoEliminado IS NULL
			BEGIN
				RAISERROR('No existe el estado "eliminado" en la tabla Estado.', 16, 1);
				RETURN;
			END
	BEGIN TRANSACTION;
	UPDATE Categoria_Producto SET estado_idEstado = @idEstadoEliminado, fecha_eliminacion = GETDATE()
	WHERE id = @idCategoria

	COMMIT TRANSACTION;
	END TRY
    BEGIN CATCH
        -- Rollback in case of error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Return error details
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (
            'Ocurrio un error eliminando la categoria en la base de datos: %s', 
            @ErrorSeverity, @ErrorState, @ErrorMessage
        );
    END CATCH
END
GO

-- PROCEDIMIENTOS DE PRODUCTO
GO

CREATE PROCEDURE crear_producto
(
    @nombre VARCHAR(90),
    @marca VARCHAR(45),
	@codigo VARCHAR(45),
	@stock INT,
	@precio FLOAT,
	@imagen_url VARCHAR(500),
	@idCategoria INT,
	@idUsuario INT,
	@idEstado INT
)
AS
BEGIN
	BEGIN TRY
    IF NOT EXISTS (SELECT 1 FROM Estado WHERE id = @idEstado)
    BEGIN
        RAISERROR('El Estado especificado no existe.', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Categoria_Producto WHERE id = @idCategoria)
    BEGIN
        RAISERROR('La categoria especificada no existe.', 16, 1);
        RETURN;
    END

	IF NOT EXISTS (SELECT 1 FROM Usuario WHERE id = @idUsuario)
    BEGIN
        RAISERROR('El usuario especificado no existe.', 16, 1);
        RETURN;
    END
	
	BEGIN TRANSACTION;
	INSERT INTO Producto(nombre, marca, codigo, stock, precio, imagen_url, Categoria_Producto_idCategoriaProducto, usuario_idUsuario, estado_idEstado, fecha_creacion, fecha_modificacion)
	VALUES(@nombre, @marca, @codigo, @stock, @precio, @imagen_url, @idCategoria, @idUsuario, @idEstado, GETDATE(), GETDATE());
	
	DECLARE @newId INT = SCOPE_IDENTITY();
	COMMIT TRANSACTION;
		-- Return la informacion del producto recien insertado
		SELECT 
			A.id,
			A.nombre,
			A.marca,
			A.codigo,
			A.stock,
			A.precio,
			A.imagen_url,
			A.Categoria_Producto_idCategoriaProducto as idCategoria,
			C.nombre as categoria,
			A.estado_idEstado as idEstado,
			B.nombre as estado,
			A.usuario_idUsuario as idUsuario,
			A.fecha_creacion,
			A.fecha_modificacion
		FROM Producto A, Estado B, Categoria_Producto C
		WHERE A.id =  @newId
		AND A.Categoria_Producto_idCategoriaProducto = C.id
		AND A.estado_idEstado = B.id;
	END TRY
    BEGIN CATCH
        -- Rollback in case of error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Return error details
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (
            'Ocurrio un error creando el producto en la base de datos: %s', 
            @ErrorSeverity, @ErrorState, @ErrorMessage
        );
    END CATCH
END
GO

CREATE PROCEDURE editar_producto
(
	@idProducto INT,
    @nombre VARCHAR(90),
    @marca VARCHAR(45),
	@codigo VARCHAR(45),
	@stock INT,
	@precio FLOAT,
	@imagen_url VARCHAR(500),
	@idCategoria INT,
	@idUsuario INT,
	@idEstado INT
)
AS
BEGIN
	BEGIN TRY
    IF NOT EXISTS (SELECT 1 FROM Producto WHERE id = @idProducto)
    BEGIN
        RAISERROR('El producto con el id especificado no existe.', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Estado WHERE id = @idEstado)
    BEGIN
        RAISERROR('El Estado especificado no existe.', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Categoria_Producto WHERE id = @idCategoria)
    BEGIN
        RAISERROR('La categoria especificada no existe.', 16, 1);
        RETURN;
    END

	IF NOT EXISTS (SELECT 1 FROM Usuario WHERE id = @idUsuario)
    BEGIN
        RAISERROR('El usuario especificado no existe.', 16, 1);
        RETURN;
    END
	BEGIN TRANSACTION;
	UPDATE Producto
	SET nombre = @nombre, marca = @marca, codigo = @codigo, 
		stock = @stock, precio = @precio, imagen_url = @imagen_url, Categoria_Producto_idCategoriaProducto = @idCategoria,
		usuario_idUsuario = @idUsuario, estado_idEstado = @idEstado, fecha_modificacion = GETDATE()
	WHERE id = @idProducto;

	COMMIT TRANSACTION;
		-- Return la informacion del Producto recien insertado
		SELECT 
			A.id,
			A.nombre,
			A.marca,
			A.codigo,
			A.stock,
			A.precio,
			A.imagen_url,
			A.Categoria_Producto_idCategoriaProducto as idCategoria,
			C.nombre as categoria,
			A.estado_idEstado as idEstado,
			B.nombre as estado,
			A.usuario_idUsuario as idUsuario,
			A.fecha_creacion,
			A.fecha_modificacion
		FROM Producto A, Estado B, Categoria_Producto C
		WHERE A.id =  @idUsuario
		AND A.Categoria_Producto_idCategoriaProducto = C.id
		AND A.estado_idEstado = B.id;
	END TRY
    BEGIN CATCH
        -- Rollback in case of error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Return error details
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (
            'Ocurrio un error actualizando el producto en la base de datos: %s', 
            @ErrorSeverity, @ErrorState, @ErrorMessage
        );
    END CATCH
END

GO

CREATE PROCEDURE eliminar_producto
(
	@idProducto int
)
AS
BEGIN
	BEGIN TRY
    IF NOT EXISTS (SELECT 1 FROM Producto WHERE id = @idProducto)
    BEGIN
        RAISERROR('El producto con el id especificado no existe.', 16, 1);
        RETURN;
    END

		DECLARE @idEstadoEliminado INT;

			SELECT @idEstadoEliminado = id
			FROM Estado
			WHERE LOWER(nombre) = 'eliminado';

			IF @idEstadoEliminado IS NULL
			BEGIN
				RAISERROR('No existe el estado "eliminado" en la tabla Estado.', 16, 1);
				RETURN;
			END
	BEGIN TRANSACTION;
	UPDATE PRODUCTO SET estado_idEstado = @idEstadoEliminado, fecha_eliminacion = GETDATE()
	WHERE id = @idProducto;
	COMMIT TRANSACTION;
	END TRY
    BEGIN CATCH
        -- Rollback in case of error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Return error details
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (
            'Ocurrio un error eliminando el producto en la base de datos: %s', 
            @ErrorSeverity, @ErrorState, @ErrorMessage
        );
    END CATCH
END


-- PROCEDIMIENTOS DE ORDEN (ORDEN CON DETALLE)
GO

CREATE PROCEDURE crear_orden_con_detalle
    @OrdenJson NVARCHAR(MAX)
AS
BEGIN
    BEGIN TRY
		
		-- Validaciones Base.. 
		-- Ver si Usuario existe
		IF NOT EXISTS (SELECT 1 FROM Usuario WHERE id = JSON_VALUE(@OrdenJson,'$.usuario_idUsuario'))
		BEGIN
			RAISERROR('El usuario con el id especificado no existe.', 16, 1);
			RETURN;
		END
        DECLARE @OrdenId INT;
        DECLARE @ErrorProductos NVARCHAR(MAX);
        
        BEGIN TRANSACTION;

        CREATE TABLE #Temp_Producto_no_stock ( -- Tabla temporal para el listado de productos sin stock suficiente
            Producto_idProducto INT,
            cantidad_requerida INT,
            cantidad_disponible INT
        );

		-- Insertar los productos que no cuentan con stock suficiente
        INSERT INTO #Temp_Producto_no_stock(Producto_idProducto, cantidad_requerida, cantidad_disponible)
        SELECT
            det.Producto_idProducto,
            det.cantidad,
            pr.stock
        FROM OPENJSON(@OrdenJson, '$.detalles_orden')
        WITH (
            Producto_idProducto INT,
            cantidad INT
        ) AS det, Producto pr
        WHERE det.Producto_idProducto = pr.id
        AND det.cantidad > pr.stock; -- Insertar solo si la cantidad que viene en el detalle de la orden es insuficiente

        -- Comprobar si hay productos con stock insuficiente
        IF EXISTS (SELECT 1 FROM #Temp_Producto_no_stock) -- Ver si existe algun producto sin stock en mi tabla temporal
        BEGIN
            SELECT @ErrorProductos = STRING_AGG(
                CONCAT('Producto ID: ', Producto_idProducto, ', Cantidad solicitada: ', cantidad_requerida, ', Cantidad disponible: ', cantidad_disponible),
                '; '
            )
            FROM #Temp_Producto_no_stock;

            RAISERROR (
                'Stock insuficiente para los siguientes productos: %s', 
                16, 1, @ErrorProductos
            );
            RETURN;
        END;

        -- Insertar en la tabla Orden
        INSERT INTO Orden (
            usuario_idUsuario,
            estado_idEstado,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            total_orden,
            fecha_creacion,
            fecha_modificacion
        )
        SELECT
            usuario_idUsuario,
            estado_idEstado,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            total_orden,
            GETDATE(),
            GETDATE()
        FROM OPENJSON(@OrdenJson)
        WITH (
            usuario_idUsuario INT,
            estado_idEstado INT,
            nombre_completo NVARCHAR(90),
            direccion NVARCHAR(200),
            telefono VARCHAR(20),
            correo_electronico VARCHAR(50),
            fecha_entrega DATE,
            total_orden FLOAT
        );

        SET @OrdenId = SCOPE_IDENTITY();

		DECLARE @ProductosVendidos TABLE(Producto_idProducto INT, cantidad_vendida INT) -- Variable temporal para obtener los productos vendidos
        -- Insertar en la tabla Orden_Detalle
        INSERT INTO Orden_Detalle (
            Orden_idOrden,
            Producto_idProducto,
            cantidad,
            precio,
            subtotal,
            fecha_creacion,
            fecha_modificacion
        )
        OUTPUT inserted.Producto_idProducto, inserted.cantidad 	-- Obtener el producto y cantidad insertada para actualizar e insertarlo en mi variable temporal
        INTO @ProductosVendidos(Producto_idProducto, cantidad_vendida)
        SELECT
            @OrdenId,
            Producto_idProducto,
            cantidad,
            precio,
            subtotal,
            GETDATE(),
            GETDATE()
        FROM OPENJSON(@OrdenJson, '$.detalles_orden')
        WITH (
            Producto_idProducto INT,
            cantidad INT,
            precio FLOAT,
            subtotal FLOAT
        );

        -- Actualizar stock en la tabla Producto
		UPDATE p
		SET p.stock = p.stock - v.cantidad_vendida
		FROM Producto p
		JOIN @ProductosVendidos v ON p.id = v.Producto_idProducto;


        -- Limpiar tabla temporal
        DROP TABLE #Temp_Producto_no_stock;

        -- Confirmar transacción
        COMMIT TRANSACTION;

        -- Retornar detalles de la orden creada
        SELECT 
            id,
            usuario_idUsuario AS idUsuario,
            estado_idEstado AS idEstado,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            fecha_entrega,
            total_orden,
            fecha_creacion
        FROM Orden
        WHERE id = @OrdenId;

    END TRY
    BEGIN CATCH
        -- Manejar errores
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (
            'Ocurrió un error creando la orden en la base de datos: %s', 
            @ErrorSeverity, @ErrorState, @ErrorMessage
        );
    END CATCH;
END
GO


CREATE PROCEDURE editar_orden_con_detalle
    @OrdenJson NVARCHAR(MAX)
AS
BEGIN
	BEGIN TRY
    DECLARE @OrdenId INT;

    SELECT @OrdenId = id FROM OPENJSON(@OrdenJson) WITH (id INT);
	BEGIN TRANSACTION;
    UPDATE Orden
    SET
        usuario_idUsuario = JSON_VALUE(@OrdenJson, '$.usuario_idUsuario'),
        estado_idEstado = JSON_VALUE(@OrdenJson, '$.estado_idEstado'),
        nombre_completo = JSON_VALUE(@OrdenJson, '$.nombre_completo'),
        direccion = JSON_VALUE(@OrdenJson, '$.direccion'),
        telefono = JSON_VALUE(@OrdenJson, '$.telefono'),
        correo_electronico = JSON_VALUE(@OrdenJson, '$.correo_electronico'),
        fecha_entrega = JSON_VALUE(@OrdenJson, '$.fecha_entrega'),
        total_orden = JSON_VALUE(@OrdenJson, '$.total_orden'),
        fecha_modificacion = GETDATE()
    WHERE id = @OrdenId;
	COMMIT TRANSACTION;
		-- Return la informacion de la orden recien insertada
		SELECT 
			 id,
			usuario_idUsuario as idUsuario,
			estado_idEstado as idEstado,
			nombre_completo,
			direccion,
			telefono,
			correo_electronico,
			fecha_entrega,
			total_orden
			fecha_modificacion
		FROM Orden
		WHERE id =  @OrdenId;
	END TRY
    BEGIN CATCH
        -- Rollback in case of error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Return error details
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (
            'Ocurrio un error actualizando la orden en la base de datos: %s', 
            @ErrorSeverity, @ErrorState, @ErrorMessage
        );
    END CATCH

END
GO

CREATE PROCEDURE actualizar_orden_entregada -- Procedimiento para actualizar la fecha de orden de entrega
	@idOrden INT
AS
BEGIN
	BEGIN TRY
	BEGIN TRANSACTION
    UPDATE Orden
    SET fecha_entrega = GETDATE(), fecha_modificacion = GETDATE()
	WHERE id = @idOrden;

	COMMIT TRANSACTION;
		SELECT 
			 id,
			fecha_entrega
		FROM Orden
		WHERE id =  @idOrden;
	END TRY
    BEGIN CATCH
        -- Rollback in case of error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Return error details
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR (
            'Ocurrio un error actualizando la fecha de entrega en la base de datos: %s', 
            @ErrorSeverity, @ErrorState, @ErrorMessage
        );
    END CATCH	
END;
GO

-- CREACION DE ROLES BASE
EXEC crear_rol @nombre = 'Administrador';
EXEC crear_rol @nombre = 'Cliente';
EXEC crear_rol @nombre = 'Operador';


-- CREACION DE ESTADOS BASE
EXEC crear_estado @nombre = 'Activo';
EXEC crear_estado @nombre = 'Inactivo';
EXEC crear_estado @nombre = 'Eliminado';
EXEC crear_estado @nombre = 'Pendiente';
EXEC crear_estado @nombre = 'Entregada';
EXEC crear_estado @nombre = 'Anulada';
EXEC crear_estado @nombre = 'En camino';


GO
/*
      a. Total de Productos activos que tenga
			en stock mayor a 0 
*/
CREATE VIEW Productos_Activos_Con_Stock AS
SELECT nombre, marca, codigo, stock, estado_idEstado, precio, imagen_url, fecha_creacion, fecha_modificacion, fecha_eliminacion
FROM Producto P
WHERE P.stock > 00
AND estado_idEstado = 1; -- Estado 'Activo'
GO

/*
		b. Total de Quetzales en ordenes
		ingresadas en el mes de Agosto 2024
*/
GO
CREATE VIEW Ordenes_Agosto_2024 AS
SELECT SUM(total_orden) as total_agosto
FROM Orden
WHERE YEAR(fecha_creacion) = 2024
AND MONTH(fecha_creacion) = 8;


GO

/*
		c. Top 10 de clientes con Mayor consumo
		de ordenes de todo el histórico
*/
CREATE VIEW Top10_clientes AS
SELECT TOP 10 A.correo_electronico, A.nombre_completo, A.razon_social, A.nombre_comercial, SUM(total_orden) as consumo_total
FROM Orden O, Usuario A
WHERE A.id = O.usuario_idUsuario
GROUP BY A.correo_electronico, A.nombre_completo, A.razon_social, A.nombre_comercial;
GO
/*
		 d. Top 10 de productos más vendidos en
		orden ascendente
*/
CREATE VIEW Top10_Productos AS
SELECT TOP 10 P.nombre, P. marca, P.codigo, P.precio, P.imagen_url, SUM(o.cantidad) As total_vendidos 
FROM Producto P, Orden_Detalle O
WHERE P.id = O.Producto_idProducto
GROUP BY P.nombre, P.marca, P.codigo, P.precio, P.imagen_url
ORDER BY total_vendidos ASC;
GO


-- PROCEDIMIENTOS PARA OBTENER (selects)
-- USUARIOS
-- Obtener usuarios y su detalle de clientes
CREATE PROCEDURE obtener_usuarios
AS
BEGIN
		SELECT 
			A.id,
			A.correo_electronico,
			A.nombre_completo,
			A.fecha_nacimiento,
			A.rol_idRol as idRol,
			C.nombre as rol,
			A.estado_idEstado as idEstado,
			B.nombre as estado,
			A.telefono,
			A.razon_social,
			A.nombre_comercial,
			A.direccion_entrega,
			A.fecha_creacion,
			A.fecha_modificacion
		FROM Usuario A, Estado B, Rol C
		WHERE A.estado_idEstado = B.id
		AND A.rol_idRol = C.id
		AND estado_idEstado <> 3; -- Todos menos estado eliminado
END
GO

-- Obtener usuario por id 
CREATE PROCEDURE obtener_usuario_por_id(
	@idUsuario INT
)
AS
BEGIN
		SELECT 
			A.id,
			A.correo_electronico,
			A.nombre_completo,
			A.fecha_nacimiento,
			A.rol_idRol as idRol,
			C.nombre as rol,
			A.estado_idEstado as idEstado,
			B.nombre as estado,
			A.telefono,
			A.razon_social,
			A.nombre_comercial,
			A.direccion_entrega,
			A.fecha_creacion,
			A.fecha_modificacion
		FROM Usuario A, Estado B, Rol C
		WHERE A.id =  @idUsuario
		AND A.estado_idEstado = B.id
		AND A.rol_idRol = C.id
		AND estado_idEstado <> 3; -- Todos menos estado eliminado
END
GO

-- Obtener usuarios por correo
CREATE PROCEDURE obtener_usuario_por_correo(
	@correo_electronico VARCHAR(50)
)
AS
BEGIN
	SELECT id, correo_electronico, nombre_completo, password, rol_idRol as idRol
	FROM Usuario
	WHERE correo_electronico = @correo_electronico
	AND estado_idEstado <> 3; -- no estado eliminado
END
GO

--  Obtener estados
CREATE PROCEDURE obtener_estado
AS
BEGIN
	SELECT id, nombre, fecha_creacion FROM estado
END
GO

-- Obtener roles
CREATE PROCEDURE obtener_roles
AS
BEGIN
	SELECT id, nombre, fecha_creacion
	FROM Rol;
END
GO

-- Obtener Categoria productos
CREATE PROCEDURE obtener_categoria_producto
AS
BEGIN
	SELECT A.id, A.nombre, E.id as idEstado, E.nombre as estado, A.fecha_creacion, A.fecha_modificacion, B.nombre_completo as usuario_creador
	FROM Categoria_Producto A, Usuario B, Estado E
	WHERE A.usuario_idUsuario = B.id
	AND A.estado_idEstado = E.id
	AND A.estado_idEstado <> 3; -- Todos menos estado eliminado
END
GO

-- PRODUCTOS
-- Obtener productos
CREATE PROCEDURE obtener_productos
AS
BEGIN
		SELECT 
			A.id,
			A.nombre,
			A.marca,
			A.codigo,
			A.stock,
			A.precio,
			A.imagen_url,
			A.Categoria_Producto_idCategoriaProducto as idCategoria,
			C.nombre as categoria,
			A.estado_idEstado as idEstado,
			B.nombre as estado,
			A.usuario_idUsuario as idUsuario,
			A.fecha_creacion,
			A.fecha_modificacion
		FROM Producto A, Estado B, Categoria_Producto C
		WHERE A.Categoria_Producto_idCategoriaProducto = C.id
		AND A.estado_idEstado = B.id
		AND C.estado_idEstado = 1 -- Solo los productos con categoria 'ACTIVA', excluir productos con categoria INACTIVA (2) o ELIMINADA (3)
		AND A.estado_idEstado <> 3; -- Todos menos estado eliminado
END
GO
-- Obtener Producto por id
CREATE PROCEDURE obtener_producto_por_id(
	@idProducto INT
)
AS
BEGIN
		SELECT 
			A.id,
			A.nombre,
			A.marca,
			A.codigo,
			A.stock,
			A.precio,
			A.imagen_url,
			A.Categoria_Producto_idCategoriaProducto as idCategoria,
			C.nombre as categoria,
			A.estado_idEstado as idEstado,
			B.nombre as estado,
			A.usuario_idUsuario as idUsuario,
			A.fecha_creacion,
			A.fecha_modificacion
		FROM Producto A, Estado B, Categoria_Producto C
		WHERE A.id = @idProducto
		AND A.Categoria_Producto_idCategoriaProducto = C.id
		AND A.estado_idEstado = B.id
		AND C.estado_idEstado = 1 -- Solo los productos con categoria 'ACTIVA', excluir productos con categoria INACTIVA (2) o ELIMINADA (3)
		AND A.estado_idEstado <> 3; -- Todos menos estado eliminado
END
GO

-- Obtener ordenes
CREATE PROCEDURE obtener_ordenes
AS
BEGIN
	SELECT  A.id, B.correo_electronico as correo_usuario, A.usuario_idUsuario as idUsuario, c.nombre as estado, 
	A.estado_idEstado as idEstado, A.nombre_completo, A.direccion, A.telefono, A.correo_electronico as correo_orden, 
	A.fecha_entrega, A.total_orden, A.fecha_creacion, A.fecha_modificacion
	FROM Orden A, Usuario B, Estado C
	WHERE A.usuario_idUsuario = B.id
	AND A.estado_idEstado = C.id
	AND A.estado_idEstado <> 3; -- Todos menos estado eliminado
END
GO

-- Obtener orden por id de orden
CREATE PROCEDURE obtener_orden_por_id(
	 @idOrden INT
)
AS
BEGIN
	SELECT  A.id, B.correo_electronico as correo_usuario, A.usuario_idUsuario as idUsuario, c.nombre as estado, 
	A.estado_idEstado as idEstado, A.nombre_completo, A.direccion, A.telefono, A.correo_electronico as correo_orden, 
	A.fecha_entrega, A.total_orden, A.fecha_creacion, A.fecha_modificacion
	FROM Orden A, Usuario B, Estado C
	WHERE A.id =  @idOrden
	AND A.usuario_idUsuario = B.id
	AND A.estado_idEstado = C.id
	AND A.estado_idEstado <> 3; -- Todos menos estado eliminado
END
GO

-- Obtener orden por id de usuario
CREATE PROCEDURE obtener_orden_por_idUsuario(
	 @idUsuario INT
)
AS
BEGIN
	SELECT  A.id, B.correo_electronico as correo_usuario, A.usuario_idUsuario as idUsuario, c.nombre as estado, 
	A.estado_idEstado as idEstado, A.nombre_completo, A.direccion, A.telefono, A.correo_electronico as correo_orden, 
	A.fecha_entrega, A.total_orden, A.fecha_creacion, A.fecha_modificacion
	FROM Orden A, Usuario B, Estado C
	WHERE A.usuario_idUsuario =  @idUsuario
	AND A.usuario_idUsuario = B.id
	AND A.estado_idEstado = C.id
	AND A.estado_idEstado <> 3; -- Todos menos estado eliminado
END
GO


CREATE PROCEDURE obtener_detalle_orden(
	 @idOrden INT
)
AS
BEGIN
	SELECT  A.id, A.Orden_idOrden as idOrden, A.Producto_idProducto as idProducto, B.nombre as producto,
	B.codigo, B.imagen_url, B.marca, A.precio, A.cantidad, A.subtotal, A.fecha_creacion, A.fecha_modificacion
	FROM Orden_Detalle A, Producto B
	WHERE A.Orden_idOrden =  @idOrden
	AND A.Producto_idProducto = B.id;
END
GO